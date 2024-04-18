import {CancelablePromise, CreatePluginUsageRequestDto, PluginUsageDto} from "src/api/generated";

export interface PluginUsageService {
    createPluginUsage(request: CreatePluginUsageRequestDto): CancelablePromise<PluginUsageDto>
}
