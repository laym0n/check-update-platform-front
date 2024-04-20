import {useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginInfoDto} from "src/api/generated";
import {PluginService} from "src/logic/services/Plugin";

export type WebResourceViewController = {
    plugins: PluginInfoDto[],
}

const useWebResourceViewController: () => WebResourceViewController = () => {
    const [pluginInfoDtos, setPluginInfoDtos] = useState([] as PluginInfoDto[])
    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getCurrentUserPlugins({})
            .then(response => {
                setPluginInfoDtos(response.plugins)
            });
    }, []);
    return {
        plugins: pluginInfoDtos,
    } as WebResourceViewController;
}

export default useWebResourceViewController;
