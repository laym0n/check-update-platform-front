import {useCallback, useEffect, useState} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {TaskService} from "src/logic/services/Task";
import {TaskCardProps} from "src/shared/components/TaskCard";

export type TaskCardsListViewController = {
    cardProps: TaskCardProps[],
}

export type TaskCardsListProps = {
    pluginId?: string,
}

const useTaskCardsListViewController: (props: TaskCardsListProps) => TaskCardsListViewController = (props: TaskCardsListProps) => {
    const [taskProps, setTaskProps] = useState([] as TaskCardProps[])

    let loadTasks = useCallback(() => {
        if (props.pluginId === undefined) {
            return
        }
        const taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.get({pluginIds: [props.pluginId]})
            .then((getTasksResponseDto) => {
                const taskCardProp = getTasksResponseDto.tasks.map(taskDto => {
                    return {
                        taskDto: taskDto,
                        key: taskDto.id,
                    } as TaskCardProps;
                });
                setTaskProps(taskCardProp)
            })
    }, [props.pluginId])

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    return {
        cardProps: taskProps,
    } as TaskCardsListViewController;
};
export default useTaskCardsListViewController;