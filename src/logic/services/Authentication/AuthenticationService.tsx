import {AuthenticationRequest, CancelablePromise, UserRegistrationRequest} from "src/api/generated";

export interface AuthenticationService {
    userAuthenticated(): boolean;

    register(request: UserRegistrationRequest): CancelablePromise<any>;

    authenticate(request: AuthenticationRequest): Promise<void>;

    logOut(): void;
}
