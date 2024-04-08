import {AuthenticationRequest, UserRegistrationRequest} from "src/api/generated";

export interface PluginService {
    userAuthenticated(): boolean;

    register(request: UserRegistrationRequest): void;

    authenticate(request: AuthenticationRequest): void;
}
