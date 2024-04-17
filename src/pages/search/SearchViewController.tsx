import {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {PluginCardProps} from "src/pages";
import {TagService} from "src/logic/services/Tags";

export type SearchViewController = {
    onTagAutocompleteChange: (event: React.SyntheticEvent, value: string[]) => void;
    onSearchValueChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onSearchValueSubmit: React.FormEventHandler<HTMLDivElement>;
    pluginCardProps: PluginCardProps[],
    searchValue: string,
    tags: string[],
}

const useSearchViewController: () => SearchViewController = () => {
    const [pluginCardProps, setPluginCardProps] = useState([] as PluginCardProps[])
    const [tags, setTags] = useState([] as string[])
    const searchValue = useRef("");
    const selectedTags = useRef([] as string[]);

    function searchPlugins() {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getPlugins({
            filtersName: searchValue.current,
            filtersTag: selectedTags.current
        })
            .then(response => {
                let newPluginCardProps = response.plugins.map(pluginInfoDto => {
                    return {
                        pluginInfoDto: pluginInfoDto,
                        key: pluginInfoDto.id,
                    } as PluginCardProps
                });
                setPluginCardProps(newPluginCardProps)
            });
    }

    useEffect(() => {
        searchPlugins();
    }, []);

    useEffect(() => {
        let tagService = diContainer.get<TagService>(TYPES.TagService);
        tagService.getTags()
            .then(response => {
                setTags(response.tags)
            })
    }, []);
    let onSearchValueSubmit: React.FormEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        searchPlugins()
    }, [])
    let onSearchValueChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback((event) => {
        searchValue.current = event.target.value
    }, [])
    let onTagAutocompleteChange: (event: React.SyntheticEvent, value: string[]) => void = (event, value) => {
        selectedTags.current = value;
        console.log(selectedTags.current)
    }
    return {
        pluginCardProps: pluginCardProps,
        searchValue: searchValue.current,
        onSearchValueSubmit: onSearchValueSubmit,
        onSearchValueChange: onSearchValueChange,
        tags: tags,
        onTagAutocompleteChange: onTagAutocompleteChange,
    };
}

export default useSearchViewController;
