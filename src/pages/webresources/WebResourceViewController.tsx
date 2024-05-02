import {useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginInfoDto} from "src/api/generated";
import {PluginService} from "src/logic/services/Plugin";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";
import {PluginsSelectListProps} from "src/shared/components/PluginsSelectList";

export type WebResourceViewController = {
    pluginsSelectListProps: PluginsSelectListProps;
}

const useWebResourceViewController: () => WebResourceViewController = () => {
    const [pluginInfoDtos, setPluginInfoDtos] = useState([] as PluginInfoDto[])
    useNavigateOnLogOut('/');

    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getCurrentUserPlugins({})
            .then(response => {
                setPluginInfoDtos(response.plugins)
            });
    }, []);
    return {
        pluginsSelectListProps: {
            plugins: pluginInfoDtos,
        }
    } as WebResourceViewController;
}

export default useWebResourceViewController;
