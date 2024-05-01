import {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {PluginCardProps} from "src/pages";
import {TagService} from "src/logic/services/Tags";
import {useSearchParams} from "react-router-dom";
import {AutocompleteValue} from "@mui/material";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import {AuthenticationService} from "src/logic/services/Authentication";

export type SearchViewController = {
    onApplyFiltersClick: React.MouseEventHandler<HTMLButtonElement>;
    selectedTags: AutocompleteValue<string, true, false, false>;
    onTagAutocompleteChange: (event: React.SyntheticEvent, value: string[]) => void;
    onSearchValueChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onSearchValueSubmit: React.FormEventHandler<HTMLDivElement>;
    pluginCardProps: PluginCardProps[],
    searchValue: string,
    tags: string[],
}

const useSearchViewController: () => SearchViewController = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [pluginCardProps, setPluginCardProps] = useState([] as PluginCardProps[])
    const [tags, setTags] = useState([] as string[])
    const searchValue = useRef(searchParams.get("search") || "");
    const selectedTags = useRef(searchParams.getAll("tags"));
    const lastSearchString = useRef(searchParams.get("search") || "");

    const layoutContext = useLayoutContext();
    const searchPlugins = useCallback((searchString: string) => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        let searchParams: URLSearchParams = new URLSearchParams();
        (selectedTags.current.length && selectedTags.current.forEach(tag => searchParams.append('tags', tag)));
        (searchString !== "" && searchParams.set('search', searchString));
        setSearchParams(searchParams)
        lastSearchString.current = searchString;
        pluginService.getPlugins({
            filtersName: searchString,
            filtersTag: selectedTags.current
        })
            .then(response => {
                let newPluginCardProps = response.plugins.map(pluginInfoDto => {
                    return {
                        pluginInfoDto: pluginInfoDto,
                        key: pluginInfoDto.id,
                    } as PluginCardProps
                });
                const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
                layoutContext.setIsAuthenticated(authenticationService.userAuthenticated)
                setPluginCardProps(newPluginCardProps)
            });
    }, [setSearchParams, layoutContext]);

    useEffect(() => {
        searchPlugins(searchValue.current);
    }, [searchPlugins]);

    useEffect(() => {
        let tagService = diContainer.get<TagService>(TYPES.TagService);
        tagService.getTags()
            .then(response => {
                setTags(response.tags)
            })
    }, []);
    let onSearchValueSubmit: React.FormEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        searchPlugins(searchValue.current)
    }, [searchPlugins])
    let onSearchValueChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback((event) => {
        searchValue.current = event.target.value
    }, [])
    let onTagAutocompleteChange: (event: React.SyntheticEvent, value: string[]) => void = useCallback((event, value) => {
        selectedTags.current = value;
    }, []);
    let onApplyFiltersClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        searchPlugins(lastSearchString.current);
    }, [searchPlugins]);
    return {
        onApplyFiltersClick: onApplyFiltersClick,
        pluginCardProps: pluginCardProps,
        searchValue: searchValue.current,
        onSearchValueSubmit: onSearchValueSubmit,
        onSearchValueChange: onSearchValueChange,
        tags: tags,
        onTagAutocompleteChange: onTagAutocompleteChange,
        selectedTags: selectedTags.current,
    } as SearchViewController;
}

export default useSearchViewController;
