import {useCallback, useEffect, useState} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {TaskService} from "src/logic/services/Task";
import {TaskCardProps} from "src/shared/components/TaskCard";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";
import {MakeDecisionRequestDto, TaskDto} from "src/api/generated";
import decision = MakeDecisionRequestDto.decision;

export type TaskCardsListViewController = {
    pluginId: string;
    cardProps: TaskCardProps[],
    onMakeDecisionByCreator: (taskDto: TaskDto) => void,
}

const useTaskCardsListViewController: () => TaskCardsListViewController = () => {
    const [taskProps, setTaskProps] = useState([] as TaskCardProps[])
    const pluginSelectListContext = usePluginSelectListContext();
    console.log('useTaskCardsListViewController')
    const onMakeDecisionByCreator = useCallback((taskDto: TaskDto) => {
        const taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.makeDecisionByCreator({taskId: taskDto.id, request: {decision: decision.REJECT_BY_CREATOR}})
            .then(newTaskDto => {
                const index = taskProps.findIndex(prop => prop.taskDto.id === newTaskDto.id);
                if (index === -1) {
                    return
                }
                let newTaskProps = [...taskProps]
                newTaskProps[index] = {
                    ...newTaskProps[index],
                    taskDto: newTaskDto,
                }
                setTaskProps(newTaskProps)
            })
    }, [taskProps]);

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
                        pluginId: pluginSelectListContext.selectedPluginId,
                        isNeedToShowButtonsForCreator: true,
                        isNeedToShowButtonsForEmployee: false,
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
        onMakeDecisionByCreator: onMakeDecisionByCreator,
    } as TaskCardsListViewController;
};
export default useTaskCardsListViewController;