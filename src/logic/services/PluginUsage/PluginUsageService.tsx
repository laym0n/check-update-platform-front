import {CreatePluginUsageRequestDto, GetPluginUsagesResponseDto, PluginUsageDto} from "src/api/generated";

export interface PluginUsageService {
    createPluginUsage(request: CreatePluginUsageRequestDto): Promise<PluginUsageDto>

    get(filters: PluginUsagesFilters): Promise<GetPluginUsagesResponseDto>;
}

export type PluginUsagesFilters = {
    pluginIds: string[],
}
