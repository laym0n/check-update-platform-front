import {CancelablePromise, DistributionMethodDto, GetPluginsResponseDto,} from "src/api/generated";
import {GetPluginsRequestDto, PluginService} from "./PluginService";
import {injectable} from "inversify";
import type = DistributionMethodDto.type;

// @ts-ignore
@injectable()
export class PluginServiceStubImpl implements PluginService {
    getPlugins(request: GetPluginsRequestDto): CancelablePromise<GetPluginsResponseDto> {
        let response = {
            plugins: [
                {
                    id: '1',
                    name: 'name',
                    description: {
                        distributionMethods: [
                            {
                                cost: 1.0,
                                type: type.PURCHASE,
                            },
                            {
                                cost: 1.0,
                                type: type.SUBSCRIBE,
                                duration: 'P3Y6M4DT12H30M5S',
                            }
                        ],
                        logoPath: 'https://source.unsplash.com/random?wallpapers',
                        specificDescription: {
                            description: 'description',
                            imagePaths: ['https://source.unsplash.com/random?wallpapers', 'https://source.unsplash.com/random?wallpapers', 'https://source.unsplash.com/random?wallpapers'],
                            tags: ['tag1', 'tag2']
                        }
                    }
                }
            ]
        } as GetPluginsResponseDto;
        return new CancelablePromise<GetPluginsResponseDto>(resolve => resolve(response))
    }
}
