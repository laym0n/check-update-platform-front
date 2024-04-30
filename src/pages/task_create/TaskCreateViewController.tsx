import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CreateTaskRequestDto, DistributionMethodDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {TaskService} from "src/logic/services/Task";
import {useNavigate, useParams} from "react-router-dom";
import {TagsAutocompleteProps} from "src/pages/task_create/components/TagsAutocomplete/TagsAutocompleteViewController";
import {TagService} from "src/logic/services/Tags";
import {
    DistributionMethodsFieldProps
} from "src/pages/task_create/components/DistributionMethodsField/DistributionMethodsFieldViewController";

export type TaskCreateViewController = {
    distributionMethodsField: DistributionMethodsFieldProps;
    tagsAutocompleteProps: TagsAutocompleteProps;
    onChangeDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeLogoPath: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    description: string;
    logoPath: string;
    onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void;
}

type TaskCreatePagePathVariables = {
    pluginId: string;
};


const useTaskCreateViewController: () => TaskCreateViewController = () => {
    const pathVariables = useParams<TaskCreatePagePathVariables>();
    let navigate = useNavigate();
    const description = useRef('');
    const logoPath = useRef('');
    const selectedTags = useRef([] as string[]);
    const selectedMethods = useRef([] as DistributionMethodDto[]);
    const [loadedTags, setLoadedTags] = useState([] as string[])
    useEffect(() => {
        const tagService = diContainer.get<TagService>(TYPES.TagService);
        tagService.getTags()
            .then(response => {
                setLoadedTags(response.tags)
            })
    }, []);

    let onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void = useCallback((event) => {
        event.preventDefault();
        let request = {
            pluginId: pathVariables.pluginId,
            description: {
                logoPath: logoPath.current,
                distributionMethods: selectedMethods.current,
                specificDescription: {
                    description: description.current,
                    tags: selectedTags.current,
                    imagePaths: ['https://source.unsplash.com/random?wallpapers', 'https://source.unsplash.com/random?wallpapers']
                },
            }
        } as CreateTaskRequestDto;
        const taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.create(request)
            .then(() => {
                    navigate(`/plugin/own?selectedPluginId=${pathVariables.pluginId}`)
                }
            );
    }, [navigate, pathVariables.pluginId]);

    const onChangeLogoPath: (event: React.ChangeEvent<HTMLTextAreaElement>) => void = useCallback((event) => {
        logoPath.current = event.target.value
    }, []);

    const onChangeDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => void = useCallback((event) => {
        logoPath.current = event.target.value
    }, []);
    const onSelectedTagsChange: (tags: string[]) => void = useCallback((tags) => {
        selectedTags.current = tags
    }, []);
    const onDistributionMethodsChange: (methods: DistributionMethodDto[]) => void = useCallback((methods) => {
        selectedMethods.current = methods
    }, []);

    return {
        onClickCreate: onClickCreate,
        tagsAutocompleteProps: {
            tags: loadedTags,
            selectedTags: [],
            onSelectedTagsChange: onSelectedTagsChange,
        },
        distributionMethodsField: {
            distributionMethods: [],
            onDistributionMethodsChange: onDistributionMethodsChange,
        },
        description: description.current,
        logoPath: logoPath.current,
        onChangeLogoPath: onChangeLogoPath,
        onChangeDescription: onChangeDescription,
    } as TaskCreateViewController;
}

export default useTaskCreateViewController;
