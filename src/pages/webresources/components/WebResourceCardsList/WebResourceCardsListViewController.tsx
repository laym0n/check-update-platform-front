import React, {useCallback, useEffect, useRef, useState} from "react";
import {AddWebResourceForObservingRequestDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {WebResourceObservingService} from "src/logic/services/WebResourceObserving";
import {WebResourceCardProps} from "src/pages/webresources/components/WebResourceCard";

export type WebResourceCardsListViewController = {
    onNewValueDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onSubmitAddNewResource: React.FormEventHandler<HTMLDivElement>;
    cardProps: WebResourceCardProps[],
}

export type WebResourceCardsListProps = {
    pluginId?: string,
}

const useWebResourceCardsListViewController: (props: WebResourceCardsListProps) => WebResourceCardsListViewController = (props: WebResourceCardsListProps) => {
    const [cardProps, setCardProps] = useState([] as WebResourceCardProps[])
    const pluginDescription = useRef<string>('');

    let loadWebResouceObservings = useCallback(() => {
        if (props.pluginId === undefined) {
            return
        }
        const webResourceObservingService = diContainer.get<WebResourceObservingService>(TYPES.WebResourceObservingService);
        webResourceObservingService.getObservings({pluginIds: [props.pluginId]})
            .then((webResourceResponse) => {
                const webResourceCardProps = webResourceResponse.webResourceObservings.map(observing => {
                    return {
                        webResourceObserving: observing,
                        key: observing.id,
                    } as WebResourceCardProps;
                });
                setCardProps(webResourceCardProps)
            })
    }, [props.pluginId])

    useEffect(() => {
        loadWebResouceObservings();
    }, [loadWebResouceObservings]);

    let onSubmitAddNewResource: React.FormEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.preventDefault()
            const webResourceObservingService = diContainer.get<WebResourceObservingService>(TYPES.WebResourceObservingService);
            webResourceObservingService.addObserving({
                pluginId: props.pluginId,
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
        }, [cardProps, props.pluginId]);

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