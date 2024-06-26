import {AuthenticationRequest, CancelablePromise, UserInfoDto, UserRegistrationRequestDto} from "src/api/generated";

export interface AuthenticationService {
    userAuthenticated(): boolean;

    register(request: UserRegistrationRequestDto): CancelablePromise<any>;

    authenticate(request: AuthenticationRequest): Promise<void>;

    refreshAuthorize(): Promise<void>;

    tryRefreshAuthorize(): Promise<void>;

    logOut(): void;

    initialize(): void;

    getUser(): UserInfoDto;
}
