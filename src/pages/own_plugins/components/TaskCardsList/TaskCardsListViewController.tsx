import {useCallback, useEffect, useState} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {TaskService} from "src/logic/services/Task";
import {TaskCardProps} from "src/shared/components/TaskCard";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type TaskCardsListViewController = {
    pluginId: string;
    cardProps: TaskCardProps[],
}

const useTaskCardsListViewController: () => TaskCardsListViewController = () => {
    const [taskProps, setTaskProps] = useState([] as TaskCardProps[])
    const pluginSelectListContext = usePluginSelectListContext();
    let loadTasks = useCallback(() => {
        if (!pluginSelectListContext.selectedPluginId) {
            return
        }
        const taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.get({pluginIds: [pluginSelectListContext.selectedPluginId]})
            .then((getTasksResponseDto) => {
                const taskCardProp = getTasksResponseDto.tasks.map(taskDto => {
                    return {
                        taskDto: taskDto,
                        key: taskDto.id,
                    } as TaskCardProps;
                });
                setTaskProps(taskCardProp)
            })
    }, [pluginSelectListContext.selectedPluginId])

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    return {
        cardProps: taskProps,
        pluginId: pluginSelectListContext.selectedPluginId,
    } as TaskCardsListViewController;
};
export default useTaskCardsListViewController;