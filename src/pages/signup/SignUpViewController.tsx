import React, {useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";
import {UserRegistrationRequest} from "src/api/generated";
import {useNavigate} from "react-router-dom";

export type SignUpViewController = {
    password: string;
    onPasswordChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    repeatPassword: string;
    onRepeatPasswordChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onClickRegister: (event: React.FormEvent<HTMLFormElement>) => void
}

const useSignUpViewController: () => SignUpViewController = () => {
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
    let navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            return
        }

        const data = new FormData(event.currentTarget);
        let request: UserRegistrationRequest = {
            email: data.get('email')!!.toString(),
            password: data.get('password')!!.toString()
        };
        authenticationService.register(request)
            .then(value => navigate("/sign-in"))
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onRepeatPasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    };
    return {
        onClickRegister: handleSubmit,
        password: password,
        onPasswordChange: onPasswordChange,
        repeatPassword: repeatPassword,
        onRepeatPasswordChange: onRepeatPasswordChange
    };
}

export default useSignUpViewController;
