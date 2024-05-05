import {
    AddPluginRequestDto,
    AddPluginResponseDto,
    GetPluginsResponseDto,
    PluginInfoDto,
    RefreshTokenResponseDto,
    type UpdatePluginRequestDto
} from "src/api/generated";

export interface PluginService {
    getPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto>

    getCurrentUserPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto>

    create(request: AddPluginRequestDto): Promise<AddPluginResponseDto>

    getOwnPlugins(request: GetPluginsRequestDto): Promise<GetPluginsResponseDto>

    update(requestBody: UpdatePluginRequestDto): Promise<PluginInfoDto>;

    refreshToken(pluginId: string): Promise<RefreshTokenResponseDto>;
}

export type GetPluginsRequestDto = {
    filtersTag?: Array<string>;
    filtersName?: string;
    ids?: Array<string>;
}
