import React, {useCallback} from 'react';
import {CreateTaskRequestDto, DistributionMethodDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {TaskService} from "src/logic/services/Task";
import {useNavigate, useParams} from "react-router-dom";
import type = DistributionMethodDto.type;

export type TaskCreateViewController = {
    onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void;
}

type TaskCreatePagePathVariables = {
    pluginId: string;
};


const useTaskCreateViewController: () => TaskCreateViewController = () => {
    const pathVariables = useParams<TaskCreatePagePathVariables>();
    let navigate = useNavigate();

    let onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void = useCallback((event) => {
        event.preventDefault();
        const taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.create({
            pluginId: pathVariables.pluginId,
            description: {
                logoPath: 'https://source.unsplash.com/random?wallpapers',
                distributionMethods: [
                    {
                        type: type.PURCHASE,
                        cost: 1.0,
                    }
                ],
                specificDescription: {
                    description: 'description',
                    tags: ['tag1', 'tag2', 'tag55'],
                    imagePaths: ['https://source.unsplash.com/random?wallpapers', 'https://source.unsplash.com/random?wallpapers']
                },
            }
        } as CreateTaskRequestDto)
            .then(() => {
                    navigate(`/plugin/own?selectedPluginId=${pathVariables.pluginId}`)
                }
            );
    }, [navigate, pathVariables.pluginId]);

    return {
        onClickCreate: onClickCreate,
    } as TaskCreateViewController;
}

export default useTaskCreateViewController;
