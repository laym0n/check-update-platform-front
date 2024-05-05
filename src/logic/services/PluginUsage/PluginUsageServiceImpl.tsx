import {
    CreatePluginUsageRequestDto,
    GetPluginUsagesResponseDto,
    PluginUsageClient,
    PluginUsageDto,
} from "src/api/generated";
import {PluginUsageService, PluginUsagesFilters} from "./PluginUsageService";
import {injectable} from "inversify";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";

// @ts-ignore
@injectable()
export class PluginUsageServiceImpl implements PluginUsageService {
    createPluginUsage(request: CreatePluginUsageRequestDto): Promise<PluginUsageDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => PluginUsageClient.createPluginUsage(request));
    }

    get(filters: PluginUsagesFilters): Promise<GetPluginUsagesResponseDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => PluginUsageClient.getPluginUsages(filters.pluginIds));
    }
}
