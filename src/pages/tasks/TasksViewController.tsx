import {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {TaskCardProps} from "src/shared/components/TaskCard";
import {TaskService} from "src/logic/services/Task";
import {AccessTokenDialogProps} from "src/shared/components/make_decision_dialog/AccessTokenDialogViewController";
import {TaskDto} from "src/api/generated";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";

export type TasksViewController = {
    makeDecisionDialogProps: AccessTokenDialogProps;
    taskCardProps: TaskCardProps[],
    onSwitchSelectedTask: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const useTasksViewController: () => TasksViewController = () => {
    const [taskCardProps, setTaskCardProps] = useState([] as TaskCardProps[])
    const selectedTaskDto = useRef<TaskDto | null>(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    useNavigateOnLogOut('/');

    const loadAndSetSelectedTaskDto = useCallback((id: string) => {
        let taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.get({ids: [id]})
            .then(response => {
                selectedTaskDto.current = response.tasks[0]
            })
    }, []);

    const handleOnMakeDecisionClick: (taskDto: TaskDto) => void = useCallback((taskDto) => {
        loadAndSetSelectedTaskDto(taskDto.id)
        setIsOpenDialog(true)
    }, [loadAndSetSelectedTaskDto]);

    useEffect(() => {
        let taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.get({})
            .then(response => {
                const newTaskCardProps = response.tasks.map(task => {
                    return {
                        taskDto: task,
                        key: task.id,
                        onMakeDecision: handleOnMakeDecisionClick,
                        isNeedToShowButtonsForEmployee: true,
                    } as TaskCardProps;
                });
                setTaskCardProps(newTaskCardProps)
                selectedTaskDto.current = response.tasks[0]
            });
    }, [handleOnMakeDecisionClick]);
    let onSwitchSelectedTask: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void = useCallback((event, value) => {
        loadAndSetSelectedTaskDto(value)
    }, [loadAndSetSelectedTaskDto]);
    const handleCloseDialog = useCallback(() => {
        setIsOpenDialog(false);
    }, []);
    const getTaskId: () => string = useCallback(() => {
        return selectedTaskDto.current?.id || ''
    }, [selectedTaskDto]);
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
