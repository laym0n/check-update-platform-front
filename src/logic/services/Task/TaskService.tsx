import {CreateTaskRequestDto, GetTasksResponseDto, TaskDto} from "src/api/generated";

export interface TaskService {
    create(request: CreateTaskRequestDto): Promise<TaskDto>;

    get(request: GetTasksRequestDto): Promise<GetTasksResponseDto>;
}

export type GetTasksRequestDto = {
    pluginIds?: Array<string>;
    ids?: Array<string>;
}
