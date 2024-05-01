import {useCallback, useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginInfoDto} from "src/api/generated";
import {PluginService} from "src/logic/services/Plugin";
import {WebResourceCardsListProps} from "src/pages/webresources/components/WebResourceCardsList";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";

export type WebResourceViewController = {
    plugins: PluginInfoDto[],
    webResourceCardsListProps: WebResourceCardsListProps,
    onSwitchSelectedPlugin: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const useWebResourceViewController: () => WebResourceViewController = () => {
    const [pluginInfoDtos, setPluginInfoDtos] = useState([] as PluginInfoDto[])
    const [webResourceCardsListProps, setWebResourceCardsListProps] = useState({} as WebResourceCardsListProps);
    useNavigateOnLogOut('/');

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
    let onSwitchSelectedPlugin: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void = useCallback((event, pluginId) => {
        setWebResourceCardsListProps({
            pluginId: pluginId,
        } as WebResourceCardsListProps)
    }, []);
    return {
        plugins: pluginInfoDtos,
        webResourceCardsListProps: webResourceCardsListProps,
        onSwitchSelectedPlugin: onSwitchSelectedPlugin,
    } as WebResourceViewController;
}

export default useWebResourceViewController;
