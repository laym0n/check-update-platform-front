import {CancelablePromise, CreatePluginUsageRequestDto, PluginUsageClient, PluginUsageDto,} from "src/api/generated";
import {PluginUsageService} from "./PluginUsageService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class PluginUsageServiceStubImpl implements PluginUsageService {
    createPluginUsage(request: CreatePluginUsageRequestDto): CancelablePromise<PluginUsageDto> {
        return PluginUsageClient.createPluginUsage(request);
    }
}
