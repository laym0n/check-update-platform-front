import {CancelablePromise, GetPluginsResponseDto} from "src/api/generated";

export interface PluginService {
    getPlugins(request: GetPluginsRequestDto): CancelablePromise<GetPluginsResponseDto>

    getCurrentUserPlugins(request: GetPluginsRequestDto): CancelablePromise<GetPluginsResponseDto>
}

export type GetPluginsRequestDto = {
    filtersTag?: Array<string>;
    filtersName?: string;
    ids?: Array<string>;
}
