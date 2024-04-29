import {useCallback, useEffect, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {TaskCardProps} from "src/shared/components/TaskCard";
import {TaskService} from "src/logic/services/Task";

export type TasksViewController = {
    taskCardProps: TaskCardProps[],
    onSwitchSelectedTask: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const useTasksViewController: () => TasksViewController = () => {
    const [taskCardProps, setTaskCardProps] = useState([] as TaskCardProps[])
    const [selectedTaskId, setSelectedTaskId] = useState('');

    useEffect(() => {
        let taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.get({})
            .then(response => {
                const newTaskCardProps = response.tasks.map(task => {
                    return {
                        taskDto: task,
                        key: task.id,
                    } as TaskCardProps;
                });
                setTaskCardProps(newTaskCardProps)
                setSelectedTaskId(response.tasks[0].id)
            });
    }, []);
    let onSwitchSelectedTask: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void = useCallback((event, value) => {
        setSelectedTaskId(value)
    }, []);
    return {
        taskCardProps: taskCardProps,
        onSwitchSelectedTask: onSwitchSelectedTask,
    } as TasksViewController;
}

export default useTasksViewController;
