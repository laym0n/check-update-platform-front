import {useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginInfoDto} from "src/api/generated";
import {PluginService} from "src/logic/services/Plugin";
import {WebResourceCardsListProps} from "src/pages/webresources/components/WebResourceCardsList";

export type WebResourceViewController = {
    plugins: PluginInfoDto[],
    webResourceCardsListProps: WebResourceCardsListProps,
}

const useWebResourceViewController: () => WebResourceViewController = () => {
    const [pluginInfoDtos, setPluginInfoDtos] = useState([] as PluginInfoDto[])
    const [webResourceCardsListProps, setWebResourceCardsListProps] = useState({} as WebResourceCardsListProps);

    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getCurrentUserPlugins({})
            .then(response => {
                setPluginInfoDtos(response.plugins)
                setWebResourceCardsListProps({
                    pluginId: response.plugins[0].id
                } as WebResourceCardsListProps)
            });
    }, []);
    return {
        plugins: pluginInfoDtos,
        webResourceCardsListProps: webResourceCardsListProps,
    } as WebResourceViewController;
}

export default useWebResourceViewController;
