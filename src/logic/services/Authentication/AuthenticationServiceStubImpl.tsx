import {
    AuthenticationClient,
    AuthenticationRequest,
    CancelablePromise,
    OpenAPI,
    UserClient,
    UserRegistrationRequest
} from "../../../api/generated";
import {AuthenticationService} from "./AuthenticationService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class AuthenticationServiceStubImpl implements AuthenticationService {
    private static readonly AUTH_VALUE_NAME: string = "authenticateResponse";

    authenticate(request: AuthenticationRequest): Promise<void> {
        return AuthenticationClient.authentication(request)
            .then(authenticateResponse => {
                OpenAPI.TOKEN = authenticateResponse.jwtToken.accessToken
                localStorage[AuthenticationServiceStubImpl.AUTH_VALUE_NAME] = authenticateResponse;
            });
    }

    register(request: UserRegistrationRequest): CancelablePromise<any> {
        return UserClient.register(request);
    }

    userAuthenticated(): boolean {
        return localStorage.getItem(AuthenticationServiceStubImpl.AUTH_VALUE_NAME) !== null;
    };

    logOut(): void {
        localStorage.removeItem(AuthenticationServiceStubImpl.AUTH_VALUE_NAME)
    }
}
