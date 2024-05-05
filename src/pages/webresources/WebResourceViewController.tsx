import {useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginInfoDto} from "src/api/generated";
import {PluginService} from "src/logic/services/Plugin";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";
import {PluginsSelectListProps} from "src/shared/components/PluginsSelectList";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type WebResourceViewController = {
    pluginsSelectListProps: PluginsSelectListProps;
}

const useWebResourceViewController: () => WebResourceViewController = () => {
    const [pluginInfoDtos, setPluginInfoDtos] = useState([] as PluginInfoDto[])
    useNavigateOnLogOut('/');
    const {selectedPluginId, setSelectedPluginId} = usePluginSelectListContext();
    console.log('useWebResourceViewController')
    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getCurrentUserPlugins({})
            .then(response => {
                setPluginInfoDtos(response.plugins)
                if (!response.plugins.length) {
                    return
                }
                setSelectedPluginId(response.plugins[0].id)
            });
    }, []);
    return {
        pluginsSelectListProps: {
            plugins: pluginInfoDtos,
        }
    } as WebResourceViewController;
}

export default useWebResourceViewController;
