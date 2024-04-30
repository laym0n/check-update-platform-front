import {useNavigate, useParams} from "react-router-dom";
import {PluginDescriptionProps} from "src/shared/components/plugin_description/PluginDescriptionViewController";
import {useCallback, useEffect, useState} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {TaskService} from "src/logic/services/Task";
import {MakeDecisionDialogProps} from "src/shared/components/make_decision_dialog/MakeDecisionDialogViewController";
import {TaskDto} from "src/api/generated";

export type TaskOverviewViewController = {
    makeDecisionDialogProps: MakeDecisionDialogProps;
    handleOpenDialog: () => void;
    handleCloseDialog: () => void;
    pluginDescriptionProps: PluginDescriptionProps;
}

export type TaskOverviewPathVariables = {
    id: string,
}

const useTaskOverviewViewController: () => TaskOverviewViewController = () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [pluginDescriptionProps, setPluginDescriptionProps] = useState({} as PluginDescriptionProps)
    const pathVariables = useParams<TaskOverviewPathVariables>();
    const navigate = useNavigate();

    useEffect(() => {
        let taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.get({
            ids: [pathVariables.id!]
        })
            .then(response => {
                const taskDto = response.tasks[0];
                setPluginDescriptionProps({
                    name: taskDto.plugin.name,
                    tags: taskDto.description.specificDescription?.tags,
                    logoPath: taskDto.description.logoPath,
                    imagePaths: taskDto.description.specificDescription?.imagePaths,
                    description: taskDto.description.specificDescription?.description,
                    distributionMethods: taskDto.description.distributionMethods,
                } as PluginDescriptionProps)
            });
    }, [pathVariables.id]);

    const handleCloseDialog = useCallback(() => {
        setIsOpenDialog(false);
    }, []);
    const handleOpenDialog = useCallback(() => {
        setIsOpenDialog(true);
    }, []);
    const getTask = useCallback(() => {
        return pathVariables.id;
    }, [pathVariables.id]);
    const handleMakeDecisionCallback: (value: TaskDto) => (PromiseLike<TaskDto> | TaskDto) = useCallback((taskDto) => {
        navigate('/tasks')
        return taskDto;
    }, [navigate]);

    return {
        pluginDescriptionProps: pluginDescriptionProps,
        handleOpenDialog: handleOpenDialog,
        handleCloseDialog: handleCloseDialog,
        makeDecisionDialogProps: {
            isOpenDialog: isOpenDialog,
            getTaskId: getTask,
            handleCloseDialog: handleCloseDialog,
            handleMakeDecisionCallback: handleMakeDecisionCallback,
        }
    } as TaskOverviewViewController;
}

export default useTaskOverviewViewController;
