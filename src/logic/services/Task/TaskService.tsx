import {CreateTaskRequestDto, GetTasksResponseDto, MakeDecisionRequestDto, TaskDto} from "src/api/generated";

export interface TaskService {
    create(request: CreateTaskRequestDto): Promise<TaskDto>;

    get(dto: GetTasksDto): Promise<GetTasksResponseDto>;

    makeDecision(dto: MakeDecisionDto): Promise<TaskDto>;
}

export type GetTasksDto = {
    pluginIds?: Array<string>;
    ids?: Array<string>;
}

export type MakeDecisionDto = {
    request: MakeDecisionRequestDto;
    taskId: string;
}
