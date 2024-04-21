import {CreatePluginUsageRequestDto, PluginUsageDto} from "src/api/generated";

export interface PluginUsageService {
    createPluginUsage(request: CreatePluginUsageRequestDto): Promise<PluginUsageDto>
}
