import {CancelablePromise, GetPluginsRequestDto, GetPluginsResponseDto} from "src/api/generated";

export interface PluginService {
    getPlugins(request: GetPluginsRequestDto): CancelablePromise<GetPluginsResponseDto>
}
