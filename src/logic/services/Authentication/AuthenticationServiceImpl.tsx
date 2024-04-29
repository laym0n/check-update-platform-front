import {
    AuthenticateResponse,
    AuthenticationClient,
    AuthenticationRequest,
    CancelablePromise,
    OpenAPI,
    UserClient,
    UserInfoDto,
    UserRegistrationRequestDto
} from "src/api/generated";
import {AuthenticationService} from "./AuthenticationService";
import {injectable} from "inversify";
import moment from "moment/moment";
import NotAuthorizedError from "src/logic/errors/NotAuthorizedError";

// @ts-ignore
@injectable()
export class AuthenticationServiceImpl implements AuthenticationService {
    private static readonly AUTH_VALUE_NAME: string = "authenticateResponse";

    private static getSavedAuthenticateResponse() {
        const authResponseJson: string | null = localStorage.getItem(AuthenticationServiceImpl.AUTH_VALUE_NAME);
        let authorizationDto: AuthorizationDto | null = authResponseJson == null ? null : JSON.parse(authResponseJson) as AuthorizationDto;
        return authorizationDto;
    }

    authenticate(request: AuthenticationRequest): Promise<void> {
        return AuthenticationClient.authenticate(request)
            .then(this.saveAuthenticateResponse(request.rememberMe!));
    }

    register(request: UserRegistrationRequestDto): CancelablePromise<any> {
        return UserClient.register(request);
    }

    userAuthenticated(): boolean {
        return localStorage.getItem(AuthenticationServiceImpl.AUTH_VALUE_NAME) !== null;
    };

    logOut(): void {
        localStorage.removeItem(AuthenticationServiceImpl.AUTH_VALUE_NAME)
    }

    initialize(): void {
        let authResponse = AuthenticationServiceImpl.getSavedAuthenticateResponse();
        if (authResponse === null) {
            return
        }
        OpenAPI.TOKEN = authResponse.authenticationResponse.jwtToken.accessToken;
    }

    tryRefreshAuthorize(): Promise<void> {
        const savedAuthenticateResponse = AuthenticationServiceImpl.getSavedAuthenticateResponse();
        if (!this.userAuthenticated() || savedAuthenticateResponse === null) {
            return Promise.resolve(undefined);
        }
        const nowDateTime = moment();
        if (nowDateTime.isBefore(savedAuthenticateResponse.accessTokenExpiredDate)) {
            return Promise.resolve(undefined);
        }
        if (nowDateTime.isBefore(savedAuthenticateResponse.refreshTokenExpiredDate)) {
            return AuthenticationClient.refreshAuthentication({
                refreshToken: savedAuthenticateResponse.authenticationResponse.jwtToken.refreshToken,
                rememberMe: savedAuthenticateResponse.isSetRememberMe,
            }).then(this.saveAuthenticateResponse(savedAuthenticateResponse.isSetRememberMe));
        }
        this.logOut();
        return Promise.resolve(undefined);
    }

    refreshAuthorize(): Promise<void> {
        const savedAuthenticateResponse = AuthenticationServiceImpl.getSavedAuthenticateResponse();
        if (!this.userAuthenticated() || savedAuthenticateResponse === null) {
            return new Promise(() => {
                throw new NotAuthorizedError()
            })
        }
        const nowDateTime = moment();
        if (nowDateTime.isBefore(savedAuthenticateResponse.accessTokenExpiredDate)) {
            return Promise.resolve(undefined);
        }
        if (nowDateTime.isBefore(savedAuthenticateResponse.refreshTokenExpiredDate)) {
            return AuthenticationClient.refreshAuthentication({
                refreshToken: savedAuthenticateResponse.authenticationResponse.jwtToken.refreshToken,
                rememberMe: savedAuthenticateResponse.isSetRememberMe,
            }).then(this.saveAuthenticateResponse(savedAuthenticateResponse.isSetRememberMe));
        }
        this.logOut();
        return new Promise(() => {
            throw new NotAuthorizedError("Refresh token is expired");
        })
    }

    getUser(): UserInfoDto {
        const savedAuthenticateResponse = AuthenticationServiceImpl.getSavedAuthenticateResponse();
        return savedAuthenticateResponse?.authenticationResponse.user!;
    }

    private saveAuthenticateResponse(rememberMe: boolean) {
        return (authenticateResponse: AuthenticateResponse) => {
            const accessTokenDuration = moment.duration(authenticateResponse.jwtToken.accessTokenLiveDuration);
            const refreshTokenDuration = moment.duration(authenticateResponse.jwtToken.refreshTokenLiveDuration);
            let authorizationDto = {
                authenticationResponse: authenticateResponse,
                isSetRememberMe: rememberMe,
                accessTokenExpiredDate: moment().add(accessTokenDuration),
                refreshTokenExpiredDate: moment().add(refreshTokenDuration),
            } as AuthorizationDto
            localStorage[AuthenticationServiceImpl.AUTH_VALUE_NAME] = JSON.stringify(authorizationDto);
            this.initialize();
        };
    }
}

type AuthorizationDto = {
    authenticationResponse: AuthenticateResponse,
    isSetRememberMe: boolean,
    accessTokenExpiredDate: moment.Moment,
    refreshTokenExpiredDate: moment.Moment,
}
