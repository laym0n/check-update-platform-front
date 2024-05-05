import {useEffect, useRef} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {useSearchParams} from "react-router-dom";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type OwnPluginsViewController = {
}

const useOwnPluginsViewController: () => OwnPluginsViewController = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {selectedPluginId, setSelectedPluginId, setPlugins} = usePluginSelectListContext();
    console.log('useOwnPluginsViewController')
    useEffect(() => {
        if (!selectedPluginId) {
            return
        }
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('selectedPluginId', selectedPluginId);
        setSearchParams(searchParams)
    }, [selectedPluginId, setSearchParams])

    useNavigateOnLogOut('/');

    const initPluginId = useRef(searchParams.get("selectedPluginId"));
    useEffect(() => {
        setSelectedPluginId(initPluginId.current || '')
    }, [setSelectedPluginId]);

    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getOwnPlugins({})
            .then(response => {
                setPlugins(response.plugins)
                if (!initPluginId.current) {
                    setSelectedPluginId(response.plugins[0].id)
                }
            });
    }, [setPlugins, setSelectedPluginId]);
    return {
    } as OwnPluginsViewController;
}

export default useOwnPluginsViewController;
