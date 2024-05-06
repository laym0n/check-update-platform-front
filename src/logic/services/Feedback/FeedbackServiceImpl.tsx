import {FeedbackFilters, FeedbackService} from "./FeedbackService";
import {injectable} from "inversify";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";
import {
    CreateOrUpdateFeedbackRequestDto,
    FeedbackClient,
    FeedbackDto,
    type GetFeedbacksResponseDto
} from "src/api/generated";

// @ts-ignore
@injectable()
export class FeedbackServiceImpl implements FeedbackService {
    get(request: FeedbackFilters): Promise<GetFeedbacksResponseDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.tryRefreshAuthorize()
            .then(() => FeedbackClient.getFeedbacks(request.ids, request.pluginIds, request.userIds, request.excludedUserIds));
    }

    giveFeedBack(request: CreateOrUpdateFeedbackRequestDto): Promise<FeedbackDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => FeedbackClient.createOrUpdateFeedback(request));
    }
}
