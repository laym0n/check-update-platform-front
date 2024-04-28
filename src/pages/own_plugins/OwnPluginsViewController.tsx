import {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginInfoDto} from "src/api/generated";
import {PluginService} from "src/logic/services/Plugin";
import {TaskCardsListProps} from "src/pages/own_plugins/components";
import {useSearchParams} from "react-router-dom";

export type OwnPluginsViewController = {
    plugins: PluginInfoDto[],
    taskCardListProps: TaskCardsListProps,
    onSwitchSelectedPlugin: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const useOwnPluginsViewController: () => OwnPluginsViewController = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pluginId = useRef(searchParams.get("selectedPluginId"));
    const [pluginInfoDtos, setPluginInfoDtos] = useState([] as PluginInfoDto[])
    const [taskCardsListProps, setTaskCardsListProps] = useState({
        pluginId: pluginId.current,
    } as TaskCardsListProps);

    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getOwnPlugins({})
            .then(response => {
                setPluginInfoDtos(response.plugins)
                setTaskCardsListProps({
                    pluginId: pluginId.current || response.plugins[0].id,
                } as TaskCardsListProps)
            });
    }, []);
    let onSwitchSelectedPlugin: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void = useCallback((event, pluginId) => {
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('selectedPluginId', pluginId);
        setSearchParams(searchParams)
        setTaskCardsListProps({
            pluginId: pluginId,
        } as TaskCardsListProps)
    }, [setSearchParams]);
    return {
        plugins: pluginInfoDtos,
        taskCardListProps: taskCardsListProps,
        onSwitchSelectedPlugin: onSwitchSelectedPlugin,
    } as OwnPluginsViewController;
}

export default useOwnPluginsViewController;
