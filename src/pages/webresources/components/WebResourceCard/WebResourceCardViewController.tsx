import React, {useCallback} from "react";
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
    onObservingChange: (observing: WebResourceObservingDto) => void;
}

const useWebResourceCardController: (props: WebResourceCardProps) => WebResourceCardViewController = (props: WebResourceCardProps) => {
    console.log('useWebResourceCardController')
    let {webResourceObserving, key, onObservingChange} = {...props};

    let onChangeNeedNotify: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void = useCallback((event, checked) => {
        const webResourceObservingService = diContainer.get<WebResourceObservingService>(TYPES.WebResourceObservingService);
        webResourceObservingService.stopObservings({
            webResourceId: webResourceObserving.id,
            status: checked ? status.OBSERVE : status.NOT_OBSERVE,
        }).then(observing => onObservingChange(observing))
    }, [onObservingChange, webResourceObserving.id])

    return {
        webResourceObserving: props.webResourceObserving,
        onChangeNeedNotify: onChangeNeedNotify,
    } as WebResourceCardViewController;
};
export default useWebResourceCardController;