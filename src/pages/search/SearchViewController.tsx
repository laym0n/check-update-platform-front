import {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {PluginCardProps} from "src/pages";

export type SearchViewController = {
    onSearchValueChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onSearchValueSubmit: React.FormEventHandler<HTMLDivElement>;
    pluginCardProps: PluginCardProps[],
    searchValue: string,
}

const useSearchViewController: () => SearchViewController = () => {
    const [pluginCardProps, setPluginCardProps] = useState([] as PluginCardProps[])
    const searchValue = useRef("");

    function searchPlugins() {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getPlugins({
            filters: {
                name: searchValue.current,
            }
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
    let onSearchValueSubmit: React.FormEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        searchPlugins()
    }, [])
    let onSearchValueChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback((event) => {
        searchValue.current = event.target.value
    }, [])
    return {
        pluginCardProps: pluginCardProps,
        searchValue: searchValue.current,
        onSearchValueSubmit: onSearchValueSubmit,
        onSearchValueChange: onSearchValueChange,
    };
}

export default useSearchViewController;
