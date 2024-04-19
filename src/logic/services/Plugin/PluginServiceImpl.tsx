import {CancelablePromise, GetPluginsResponseDto, PluginClient,} from "src/api/generated";
import {GetPluginsRequestDto, PluginService} from "./PluginService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class PluginServiceImpl implements PluginService {
    getPlugins(request: GetPluginsRequestDto): CancelablePromise<GetPluginsResponseDto> {
        return PluginClient.getPlugins(request.ids, request.filtersName, request.filtersTag);
    }
}
