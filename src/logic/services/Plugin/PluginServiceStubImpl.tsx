import {
    CancelablePromise,
    DistributionMethodDto,
    GetPluginsRequestDto,
    GetPluginsResponseDto,
    PluginDto
} from "../../../api/generated";
import {PluginService} from "./PluginService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class PluginServiceStubImpl implements PluginService {
    getPlugins(request: GetPluginsRequestDto): CancelablePromise<GetPluginsResponseDto> {
        let response: GetPluginsResponseDto = {
            plugins: [
                this.createPluginDto(1),
                this.createPluginDto(2),
                this.createPluginDto(3),
                this.createPluginDto(4),
                this.createPluginDto(5),
                this.createPluginDto(6),
                this.createPluginDto(7),
                this.createPluginDto(8),
                this.createPluginDto(9),
                this.createPluginDto(10),
                this.createPluginDto(11),
            ]
        }
        return new CancelablePromise((resolve) => {
            resolve(response);
        });
    }

    private createPluginDto(id: number): PluginDto {
        return {
            id: id.toString(),
            baseUrl: '1',
            name: 'name',
            description: {
                logoPath: 'https://source.unsplash.com/random?wallpapers',
                distributionMethods: [
                    {
                        cost: 1,
                        type: DistributionMethodDto.type.PURCHASE,
                        duration: '1'
                    }
                ]
            }
        }
    }
}
