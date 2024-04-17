import {CancelablePromise, GetPluginsResponseDto, PluginClient,} from "src/api/generated";
import {GetPluginsRequestDto, PluginService} from "./PluginService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class PluginServiceStubImpl implements PluginService {
    getPlugins(request: GetPluginsRequestDto): CancelablePromise<GetPluginsResponseDto> {
        return PluginClient.getPlugins(request.filtersName, request.filtersTag);
    }
}
