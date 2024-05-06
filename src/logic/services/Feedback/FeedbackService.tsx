import type {CreateOrUpdateFeedbackRequestDto, FeedbackDto, GetFeedbacksResponseDto} from "src/api/generated";

export interface FeedbackService {
    get(request: FeedbackFilters): Promise<GetFeedbacksResponseDto>;

    giveFeedBack(request: CreateOrUpdateFeedbackRequestDto): Promise<FeedbackDto>;
}

export type FeedbackFilters = {
    ids?: string[],
    userIds?: string[],
    pluginIds?: string[],
    excludedUserIds?: string[],
}

