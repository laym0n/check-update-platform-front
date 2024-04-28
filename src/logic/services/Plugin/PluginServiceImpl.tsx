import {AddPluginRequestDto, AddPluginResponseDto, GetPluginsResponseDto, PluginClient,} from "src/api/generated";
import {GetPluginsRequestDto, PluginService} from "./PluginService";
import {injectable} from "inversify";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";

// @ts-ignore
@injectable()
export class PluginServiceImpl implements PluginService {
    getPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.tryRefreshAuthorize()
            .then(() => PluginClient.getPlugins(request.ids, request.filtersName, request.filtersTag));
    }

    getCurrentUserPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => PluginClient.getMyPlugins(request.ids, request.filtersName, request.filtersTag));
    }

    create(request: AddPluginRequestDto): Promise<AddPluginResponseDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => PluginClient.createPlugin(request));
    }

    getOwnPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => PluginClient.getOwnPlugins(request.ids, request.filtersName, request.filtersTag));
    }
}
