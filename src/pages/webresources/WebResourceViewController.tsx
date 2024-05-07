import {useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type WebResourceViewController = {
    isHidenInfos: boolean;
}

const useWebResourceViewController: () => WebResourceViewController = () => {
    useNavigateOnLogOut('/');
    const {setSelectedPluginId, setPlugins} = usePluginSelectListContext();
    const [isHidenInfos, setIsHidenInfos] = useState(true)
    console.log('useWebResourceViewController')
    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getCurrentUserPlugins({})
            .then(response => {
                setPlugins(response.plugins)
                if (!response.plugins.length) {
                    return
                }
                setIsHidenInfos(false)
                setSelectedPluginId(response.plugins[0].id)
            });
    }, [setPlugins, setSelectedPluginId]);
    return {
        isHidenInfos: isHidenInfos,
    } as WebResourceViewController;
}

export default useWebResourceViewController;
