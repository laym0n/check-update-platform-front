import {AddPluginRequestDto, AddPluginResponseDto, GetPluginsResponseDto} from "src/api/generated";

export interface PluginService {
    getPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto>

    getCurrentUserPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto>

    create(request: AddPluginRequestDto): Promise<AddPluginResponseDto>

    getOwnPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto>
}

export type GetPluginsRequestDto = {
    filtersTag?: Array<string>;
    filtersName?: string;
    ids?: Array<string>;
}
