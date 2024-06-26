import React, {useCallback, useEffect, useRef, useState} from "react";
import {AddWebResourceForObservingRequestDto, WebResourceObservingDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {WebResourceObservingService} from "src/logic/services/WebResourceObserving";
import {WebResourceCardProps} from "src/pages/webresources/components/WebResourceCard";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type WebResourceCardsListViewController = {
    onNewValueDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onSubmitAddNewResource: React.FormEventHandler<HTMLDivElement>;
    cardProps: WebResourceCardProps[],
    onObservingChange: (observing: WebResourceObservingDto) => void;
}

const useWebResourceCardsListViewController: () => WebResourceCardsListViewController = () => {
    const [cardProps, setCardProps] = useState([] as WebResourceCardProps[])
    const pluginDescription = useRef<string>('');
    const {selectedPluginId} = usePluginSelectListContext();
    console.log('useWebResourceCardsListViewController')
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
                    const index = cardProps.findIndex(prop => {
                        return prop.key === observing.id
                    });
                    if (index !== -1) {
                        let newCardProps = [...cardProps];
                        newCardProps[index] = {
                            ...newCardProps[index],
                            webResourceObserving: observing,
                        }
                        setCardProps(newCardProps)
                        return
                    }
                    let newCardProps = [...cardProps, {
                        webResourceObserving: observing,
                        key: observing.id
                    } as WebResourceCardProps];
                    setCardProps(newCardProps)
                })
        }, [cardProps, selectedPluginId]);

    const onObservingChange = useCallback((observing: WebResourceObservingDto) => {
        const index = cardProps.findIndex(cardProp => cardProp.webResourceObserving.id === observing.id);
        if (index === -1) {
            return
        }
        let newCardProps = [...cardProps]
        newCardProps[index] = {
            ...newCardProps[index],
            webResourceObserving: observing,
        }
        setCardProps(newCardProps)
    }, [cardProps]);

    let onNewValueDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback(
        (event) => {
            pluginDescription.current = event.target.value
        }, []);
    return {
        onSubmitAddNewResource: onSubmitAddNewResource,
        onNewValueDescriptionChange: onNewValueDescriptionChange,
        cardProps: cardProps,
        onObservingChange: onObservingChange,
    } as WebResourceCardsListViewController;
};
export default useWebResourceCardsListViewController;