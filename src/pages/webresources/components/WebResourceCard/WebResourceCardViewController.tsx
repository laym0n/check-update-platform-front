import React, {useCallback, useEffect, useState} from "react";
import {UpdateWebResourceObservingRequestDto, WebResourceObservingDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {WebResourceObservingService} from "src/logic/services/WebResourceObserving";
import status = UpdateWebResourceObservingRequestDto.status;

export type WebResourceCardViewController = {
    onChangeNeedNotify: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    webResourceObserving: WebResourceObservingDto,
}

export type WebResourceCardProps = {
    key: string,
    webResourceObserving: WebResourceObservingDto,
}

const useWebResourceCardController: (props: WebResourceCardProps) => WebResourceCardViewController = (props: WebResourceCardProps) => {
    const [webResourceObserving, setWebResourceObserving] = useState(props.webResourceObserving)

    useEffect(() => {
        setWebResourceObserving(props.webResourceObserving)
        console.log(1)
    }, [props.webResourceObserving]);

    let onChangeNeedNotify: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void = useCallback((event, checked) => {
        const webResourceObservingService = diContainer.get<WebResourceObservingService>(TYPES.WebResourceObservingService);
        webResourceObservingService.stopObservings({
            webResourceId: props.webResourceObserving.id,
            status: checked ? status.OBSERVE : status.NOT_OBSERVE,
        }).then(observing => setWebResourceObserving(observing))
    }, [props.webResourceObserving.id])

    return {
        webResourceObserving: webResourceObserving,
        onChangeNeedNotify: onChangeNeedNotify,
    } as WebResourceCardViewController;
};
export default useWebResourceCardController;