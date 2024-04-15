import {useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {PluginCardProps} from "src/pages";

export type SearchViewController = {
    pluginCardProps: PluginCardProps[],
}

const useSearchViewController: () => SearchViewController = () => {
    const [pluginCardProps, setPluginCardProps] = useState([] as PluginCardProps[])
    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getPlugins({})
            .then(response => {
                let newPluginCardProps = response.plugins.map(pluginInfoDto => {
                    return {
                        pluginInfoDto: pluginInfoDto,
                        key: pluginInfoDto.id,
                    } as PluginCardProps
                });
                setPluginCardProps(newPluginCardProps)
            });
    }, []);
    return {
        pluginCardProps: pluginCardProps
    };
}

export default useSearchViewController;
