import {TaskDto} from "src/api/generated";

export type TaskCardViewController = {
    taskDto: TaskDto,
}

export type TaskCardProps = {
    key: string,
    taskDto: TaskDto,
}

const useTaskCardController: (props: TaskCardProps) => TaskCardViewController = (props: TaskCardProps) => {

    return {
        taskDto: props.taskDto,
    } as TaskCardViewController;
};
export default useTaskCardController;