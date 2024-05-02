import React, {useCallback, useEffect, useRef, useState} from "react";
import {AddWebResourceForObservingRequestDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {WebResourceObservingService} from "src/logic/services/WebResourceObserving";
import {WebResourceCardProps} from "src/pages/webresources/components/WebResourceCard";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type WebResourceCardsListViewController = {
    onNewValueDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onSubmitAddNewResource: React.FormEventHandler<HTMLDivElement>;
    cardProps: WebResourceCardProps[],
}

const useWebResourceCardsListViewController: () => WebResourceCardsListViewController = () => {
    const [cardProps, setCardProps] = useState([] as WebResourceCardProps[])
    const pluginDescription = useRef<string>('');
    const {selectedPluginId, setSelectedPluginId} = usePluginSelectListContext();

    let loadWebResouceObservings = useCallback(() => {
        if (!selectedPluginId) {
            return
        }
        const webResourceObservingService = diContainer.get<WebResourceObservingService>(TYPES.WebResourceObservingService);
        webResourceObservingService.getObservings({pluginIds: [selectedPluginId]})
            .then((webResourceResponse) => {
                const webResourceCardProps = webResourceResponse.webResourceObservings.map(observing => {
                    return {
                        webResourceObserving: observing,
                        key: observing.id,
                    } as WebResourceCardProps;
                });
                setCardProps(webResourceCardProps)
            })
    }, [selectedPluginId])

    useEffect(() => {
        loadWebResouceObservings();
    }, [loadWebResouceObservings]);

    let onSubmitAddNewResource: React.FormEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.preventDefault()
            const webResourceObservingService = diContainer.get<WebResourceObservingService>(TYPES.WebResourceObservingService);
            webResourceObservingService.addObserving({
                pluginId: selectedPluginId,
                resourceDescription: pluginDescription.current,
            } as AddWebResourceForObservingRequestDto)
                .then(observing => {
                    const propAlreadyExists = cardProps.filter(prop => {
                        return prop.key === observing.id
                    }).length !== 0;
                    if (propAlreadyExists) {
                        return
                    }
                    let newCardProps = [...cardProps, {
                        webResourceObserving: observing,
                        key: observing.id
                    } as WebResourceCardProps];
                    setCardProps(newCardProps)
                })
        }, [cardProps, selectedPluginId]);

    let onNewValueDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback(
        (event) => {
            pluginDescription.current = event.target.value
        }, []);
    return {
        onSubmitAddNewResource: onSubmitAddNewResource,
        onNewValueDescriptionChange: onNewValueDescriptionChange,
        cardProps: cardProps,
    } as WebResourceCardsListViewController;
};
export default useWebResourceCardsListViewController;