import {useEffect} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type WebResourceViewController = {
}

const useWebResourceViewController: () => WebResourceViewController = () => {
    useNavigateOnLogOut('/');
    const {setSelectedPluginId, setPlugins} = usePluginSelectListContext();
    console.log('useWebResourceViewController')
    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getCurrentUserPlugins({})
            .then(response => {
                setPlugins(response.plugins)
                if (!response.plugins.length) {
                    return
                }
                setSelectedPluginId(response.plugins[0].id)
            });
    }, [setPlugins, setSelectedPluginId]);
    return {
    } as WebResourceViewController;
}

export default useWebResourceViewController;
