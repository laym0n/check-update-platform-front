import React from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";
import {AuthenticationRequest} from "src/api/generated";
import {useNavigate} from "react-router-dom";

export type SignInViewModel = {
    onSubmitSignIn: (event: React.FormEvent<HTMLFormElement>) => void
}

const useSignInViewModel: () => SignInViewModel = () => {
    let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
    let navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let request: AuthenticationRequest = {
            email: data.get('email')!!.toString(),
            password: data.get('password')!!.toString(),
            rememberMe: data.get('rememberMe') === 'on',
        }
        authenticationService.authenticate(request)
            .then(() => {
                navigate("/test")
            });

    };
    return {
        onSubmitSignIn: handleSubmit
    };
}

export default useSignInViewModel;
