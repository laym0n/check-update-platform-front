import {
    AuthenticateResponse,
    AuthenticationClient,
    AuthenticationRequest,
    CancelablePromise,
    OpenAPI,
    UserClient,
    UserRegistrationRequestDto
} from "../../../api/generated";
import {AuthenticationService} from "./AuthenticationService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class AuthenticationServiceStubImpl implements AuthenticationService {
    private static readonly AUTH_VALUE_NAME: string = "authenticateResponse";

    authenticate(request: AuthenticationRequest): Promise<void> {
        return AuthenticationClient.authenticate(request)
            .then(authenticateResponse => {
                localStorage[AuthenticationServiceStubImpl.AUTH_VALUE_NAME] = JSON.stringify(authenticateResponse);
                this.initialize();
            });
    }

    register(request: UserRegistrationRequestDto): CancelablePromise<any> {
        return UserClient.register(request);
    }

    userAuthenticated(): boolean {
        return localStorage.getItem(AuthenticationServiceStubImpl.AUTH_VALUE_NAME) !== null;
    };

    logOut(): void {
        localStorage.removeItem(AuthenticationServiceStubImpl.AUTH_VALUE_NAME)
    }

    initialize(): void {
        const authResponseJson: string | null = localStorage.getItem(AuthenticationServiceStubImpl.AUTH_VALUE_NAME);
        let authResponse: AuthenticateResponse | null = authResponseJson == null ? null : JSON.parse(authResponseJson) as AuthenticateResponse;
        if (authResponse === null) {
            return
        }
        OpenAPI.TOKEN = authResponse.jwtToken.accessToken;
    }
}
