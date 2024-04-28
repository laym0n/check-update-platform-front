import React, {useCallback, useRef} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {AddPluginRequestDto} from "src/api/generated";

export type PluginCreateViewController = {
    onNameChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onBaseUrlChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void;
}

const usePluginCreateViewController: () => PluginCreateViewController = () => {
    const name = useRef('');
    const baseUrl = useRef('');

    let onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void = useCallback((event) => {
        const pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.create({
            baseUrl: baseUrl.current,
            name: name.current,
        } as AddPluginRequestDto)
            .then()
    }, []);

    let onNameChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback(event => {
        name.current = event.target.value
    }, []);

    let onBaseUrlChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback(event => {
        baseUrl.current = event.target.value
    }, []);

    return {
        onClickCreate: onClickCreate,
        onBaseUrlChange: onBaseUrlChange,
        onNameChange: onNameChange,
    } as PluginCreateViewController;
}

export default usePluginCreateViewController;
