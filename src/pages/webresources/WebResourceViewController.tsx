import {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {AddWebResourceForObservingRequestDto, PluginInfoDto} from "src/api/generated";
import {PluginService} from "src/logic/services/Plugin";
import {WebResourceObservingService} from "src/logic/services/WebResourceObserving";
import {WebResourceCardProps} from "src/pages/webresources/components";

export type WebResourceViewController = {
    onNewValueDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onSubmitAddNewResource: React.FormEventHandler<HTMLDivElement>;
    plugins: PluginInfoDto[],
    cardProps: WebResourceCardProps[],
}

const useWebResourceViewController: () => WebResourceViewController = () => {
    const [pluginInfoDtos, setPluginInfoDtos] = useState([] as PluginInfoDto[])
    const [cardProps, setCardProps] = useState([] as WebResourceCardProps[])
    const selectedPluginId = useRef('');
    const pluginDescription = useRef<string>('');

    function loadWebResouceObservings() {
        const webResourceObservingService = diContainer.get<WebResourceObservingService>(TYPES.WebResourceObservingService);
        webResourceObservingService.getObservings({pluginIds: [selectedPluginId.current]})
            .then((webResourceResponse) => {
                const webResourceCardProps = webResourceResponse.webResourceObservings.map(observing => {
                    return {
                        webResourceObserving: observing,
                        key: observing.id,
                    } as WebResourceCardProps;
                });
                setCardProps(webResourceCardProps)
            })
    }

    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getCurrentUserPlugins({})
            .then(response => {
                setPluginInfoDtos(response.plugins)
                selectedPluginId.current = response.plugins[0].id
                loadWebResouceObservings();
            });
    }, []);

    let onSubmitAddNewResource: React.FormEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            const webResourceObservingService = diContainer.get<WebResourceObservingService>(TYPES.WebResourceObservingService);
            webResourceObservingService.addObserving({
                pluginId: selectedPluginId.current,
                resourceDescription: pluginDescription.current,
            } as AddWebResourceForObservingRequestDto)
                .then(observing => {
                    setCardProps([...cardProps, {webResourceObserving: observing, key: observing.id}])
                })
        }, [cardProps]);

    let onNewValueDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback(
        (event) => {
            pluginDescription.current = event.target.value
            loadWebResouceObservings()
        }, []);
    return {
        plugins: pluginInfoDtos,
        onSubmitAddNewResource: onSubmitAddNewResource,
        onNewValueDescriptionChange: onNewValueDescriptionChange,
        cardProps: cardProps,
    } as WebResourceViewController;
}

export default useWebResourceViewController;
