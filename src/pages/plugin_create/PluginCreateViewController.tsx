import React, {useCallback, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {AddPluginRequestDto} from "src/api/generated";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";
import {AccessTokenDialogProps} from "src/shared/components/make_decision_dialog/AccessTokenDialogViewController";
import {useNavigate} from "react-router-dom";

export type PluginCreateViewController = {
    accessTokenDialogProps: AccessTokenDialogProps;
    isHiddenForm: boolean;
    onNameChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onBaseUrlChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void;
}

const usePluginCreateViewController: () => PluginCreateViewController = () => {
    const name = useRef('');
    const baseUrl = useRef('');
    const navigate = useNavigate();
    useNavigateOnLogOut('/');

    const [isHiddenForm, setIsHiddenForm] = useState(false)
    const [accessToken, setAccessToken] = useState('')

    const onCloseClick = useCallback(() => {
        navigate('/plugin/own')
    }, [navigate]);

    let onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void = useCallback((event) => {
        event.preventDefault();
        const pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.create({
            baseUrl: baseUrl.current,
            name: name.current,
        } as AddPluginRequestDto)
            .then(response => {
                setAccessToken(response.accessToken)
                setIsHiddenForm(true)
            })
    }, []);

    let onNameChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback(event => {
        name.current = event.target.value
    }, []);

    let onBaseUrlChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback(event => {
        baseUrl.current = event.target.value
    }, []);

    return {
        isHiddenForm: isHiddenForm,
        onClickCreate: onClickCreate,
        onBaseUrlChange: onBaseUrlChange,
        onNameChange: onNameChange,
        accessTokenDialogProps: {
            isOpenDialog: isHiddenForm,
            accessToken: accessToken,
            onCloseClick: onCloseClick,
        }
    } as PluginCreateViewController;
}

export default usePluginCreateViewController;
