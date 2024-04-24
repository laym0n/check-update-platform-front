import {
    AddWebResourceForObservingRequestDto,
    GetWebResouceObservingsResponseDto,
    UpdateWebResourceObservingRequestDto,
    WebResourceObservingDto
} from "src/api/generated";

export interface WebResourceObservingService {
    addObserving(request: AddWebResourceForObservingRequestDto): Promise<WebResourceObservingDto>

    getObservings(request: WebResourceObservingFiltersDto): Promise<GetWebResouceObservingsResponseDto>

    stopObservings(request: StopWebResourceObservingDto): Promise<WebResourceObservingDto>
}

export type WebResourceObservingFiltersDto = {
    pluginIds?: Array<string>;
}

export type StopWebResourceObservingDto = {
    status: UpdateWebResourceObservingRequestDto.status
    webResourceId: string;
}
