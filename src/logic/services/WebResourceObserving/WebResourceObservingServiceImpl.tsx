import {
    StopWebResourceObservingDto,
    WebResourceObservingFiltersDto,
    WebResourceObservingService
} from "./WebResourceObservingService";
import {injectable} from "inversify";
import {
    AddWebResourceForObservingRequestDto,
    GetWebResouceObservingsResponseDto,
    WebResourceObservingClient,
    WebResourceObservingDto
} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";

// @ts-ignore
@injectable()
export class WebResourceObservingServiceImpl implements WebResourceObservingService {
    addObserving(request: AddWebResourceForObservingRequestDto): Promise<WebResourceObservingDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => WebResourceObservingClient.createObserving(request))
    }

    getObservings(request: WebResourceObservingFiltersDto): Promise<GetWebResouceObservingsResponseDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => WebResourceObservingClient.getObservings(request.pluginIds))
    }

    stopObservings(request: StopWebResourceObservingDto): Promise<WebResourceObservingDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => WebResourceObservingClient.stopObserve(request.webResourceId, {status: request.status}))
    }
}
