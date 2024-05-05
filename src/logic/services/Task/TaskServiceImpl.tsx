import {GetTasksDto, MakeDecisionDto, TaskService} from "./TaskService";
import {injectable} from "inversify";
import {CreateTaskRequestDto, GetTasksResponseDto, TaskClient, TaskDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";

// @ts-ignore
@injectable()
export class TaskServiceImpl implements TaskService {
    create(request: CreateTaskRequestDto): Promise<TaskDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => TaskClient.createTask(request));
    }

    get(dto: GetTasksDto): Promise<GetTasksResponseDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => TaskClient.getTasks(dto.ids, dto.pluginIds));
    }

    makeDecision(dto: MakeDecisionDto): Promise<TaskDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => TaskClient.makeDecision(dto.taskId, dto.request));
    }

    makeDecisionByCreator(dto: MakeDecisionDto): Promise<TaskDto> {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        return authenticationService.refreshAuthorize()
            .then(() => TaskClient.makeDecisionByCreator(dto.taskId, dto.request));
    }
}
