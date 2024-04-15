import {AuthenticationRequest, CancelablePromise, UserRegistrationRequestDto} from "src/api/generated";

export interface AuthenticationService {
    userAuthenticated(): boolean;

    register(request: AuthenticationRequest): CancelablePromise<any>;

    authenticate(request: UserRegistrationRequestDto): Promise<void>;

    logOut(): void;
}
