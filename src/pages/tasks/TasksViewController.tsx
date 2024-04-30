import {useCallback, useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {TaskCardProps} from "src/shared/components/TaskCard";
import {TaskService} from "src/logic/services/Task";
import {MakeDecisionDialogProps} from "src/shared/components/make_decision_dialog/MakeDecisionDialogViewController";
import {TaskDto} from "src/api/generated";

export type TasksViewController = {
    makeDecisionDialogProps: MakeDecisionDialogProps;
    taskCardProps: TaskCardProps[],
    onSwitchSelectedTask: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const useTasksViewController: () => TasksViewController = () => {
    const [taskCardProps, setTaskCardProps] = useState([] as TaskCardProps[])
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const handleOnMakeDecisionClick: (taskDto: TaskDto) => void = useCallback((taskDto) => {
        setSelectedTaskId(taskDto.id)
        setIsOpenDialog(true)
    }, []);
    
    useEffect(() => {
        let taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.get({})
            .then(response => {
                const newTaskCardProps = response.tasks.map(task => {
                    return {
                        taskDto: task,
                        key: task.id,
                        onMakeDecision: handleOnMakeDecisionClick,
                    } as TaskCardProps;
                });
                setTaskCardProps(newTaskCardProps)
                setSelectedTaskId(response.tasks[0].id)
            });
    }, [handleOnMakeDecisionClick]);
    let onSwitchSelectedTask: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void = useCallback((event, value) => {
        setSelectedTaskId(value)
    }, []);
    const handleCloseDialog = useCallback(() => {
        setIsOpenDialog(false);
    }, []);
    const getTaskId: () => string = useCallback(() => {
        return selectedTaskId
    }, [selectedTaskId]);
    const handleMakeDecisionCallback: (value: TaskDto) => (PromiseLike<TaskDto> | TaskDto) = useCallback((taskDto) => {
        let newTaskCardProps = [...taskCardProps];
        const index = newTaskCardProps.findIndex((taskCardProps) => {
            return taskDto.id === taskCardProps.taskDto.id;
        });
        newTaskCardProps[index] = {
            taskDto: taskDto,
            key: taskDto.id,
            onMakeDecision: handleOnMakeDecisionClick,
        } as TaskCardProps;
        setTaskCardProps(newTaskCardProps)
        setIsOpenDialog(false)
        return taskDto
    }, [handleOnMakeDecisionClick, taskCardProps]);
    
    return {
        taskCardProps: taskCardProps,
        onSwitchSelectedTask: onSwitchSelectedTask,
        makeDecisionDialogProps: {
            isOpenDialog: isOpenDialog,
            getTaskId: getTaskId,
            handleCloseDialog: handleCloseDialog,
            handleMakeDecisionCallback: handleMakeDecisionCallback,
        },
    } as TasksViewController;
}

export default useTasksViewController;
