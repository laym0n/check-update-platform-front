import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CreateTaskRequestDto, DistributionMethodDto, TagInfoDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {TaskService} from "src/logic/services/Task";
import {useNavigate, useParams} from "react-router-dom";
import {TagsAutocompleteProps} from "src/pages/task_create/components/TagsAutocomplete/TagsAutocompleteViewController";
import {TagService} from "src/logic/services/Tags";
import {
    DistributionMethodsFieldProps
} from "src/pages/task_create/components/DistributionMethodsField/DistributionMethodsFieldViewController";
import {
    TextFieldWithInitProps
} from "src/pages/task_create/components/TextFieldWithInit/TextFieldWithInitViewController";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";
import {ImagePathsFieldProps} from "src/pages/task_create/components/ImagePathsField/ImagePathsFieldViewController";

export type TaskCreateViewController = {
    buttonLabel: string;
    imagePathsFieldProps: ImagePathsFieldProps;
    propsForDescription: TextFieldWithInitProps;
    propsForLogoPath: TextFieldWithInitProps;
    distributionMethodsField: DistributionMethodsFieldProps;
    tagsAutocompleteProps: TagsAutocompleteProps;
    onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void;
}

type TaskCreatePagePathVariables = {
    pluginId: string;
    taskId?: string;
};


const useTaskCreateViewController: () => TaskCreateViewController = () => {
    const pathVariables = useParams<TaskCreatePagePathVariables>();
    let navigate = useNavigate();
    const [initDescription, setInitDescription] = useState('')
    const [initLogoPath, setInitLogoPath] = useState('')
    const description = useRef('');
    const logoPath = useRef('');
    const selectedTags = useRef([] as string[]);
    const selectedImagePaths = useRef([] as string[]);
    const selectedMethods = useRef([] as DistributionMethodDto[]);
    const [loadedTags, setLoadedTags] = useState([] as string[])
    useNavigateOnLogOut('/');
    useEffect(() => {
        const tagService = diContainer.get<TagService>(TYPES.TagService);
        tagService.getTags()
            .then(response => {
                setLoadedTags(response.tags)
            })
    }, []);

    let onClickCreate: (event: React.FormEvent<HTMLFormElement>) => void = useCallback((event) => {
        event.preventDefault();
        console.log(selectedTags.current)
        let request = {
            pluginId: pathVariables.pluginId,
            description: {
                logoPath: logoPath.current,
                distributionMethods: selectedMethods.current,
                specificDescription: {
                    description: description.current,
                    tags: selectedTags.current,
                    imagePaths: selectedImagePaths.current
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

    const onChangeLogoPath: (value: string) => void = useCallback((value) => {
        logoPath.current = value;
    }, []);

    const onChangeDescription: (value: string) => void = useCallback((value) => {
        description.current = value;
    }, []);
    const onSelectedTagsChange: (tags: string[]) => void = useCallback((tags) => {
        selectedTags.current = tags
    }, []);
    const onDistributionMethodsChange: (methods: DistributionMethodDto[]) => void = useCallback((methods) => {
        selectedMethods.current = methods
    }, []);
    const onImagePathsChange: (paths: string[]) => void = useCallback((paths) => {
        selectedImagePaths.current = paths
    }, []);

    const [initSelectedTags, setInitSelectedTags] = useState([] as TagInfoDto[])
    const [initImagePaths, setInitImagePaths] = useState([] as string[])

    const [distributionMethodsField, setDistributionMethodsField] = useState({
        distributionMethods: [],
        onDistributionMethodsChange: onDistributionMethodsChange,
    } as DistributionMethodsFieldProps)

    useEffect(() => {
        if (!pathVariables.taskId) {
            return
        }
        const taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.get({ids: [pathVariables.taskId]})
            .then(response => {
                const taskDto = response.tasks[0];
                setDistributionMethodsField({
                    distributionMethods: taskDto.description.distributionMethods,
                    onDistributionMethodsChange: onDistributionMethodsChange,
                })
                setInitSelectedTags(taskDto.description.specificDescription?.tags || [])
                setInitLogoPath(taskDto.description.logoPath || '')
                setInitDescription(taskDto.description.specificDescription?.description || '')
                setInitImagePaths(taskDto.description.specificDescription?.imagePaths || [])
            })
    }, [onDistributionMethodsChange, onSelectedTagsChange, pathVariables.taskId]);

    return {
        onClickCreate: onClickCreate,
        tagsAutocompleteProps: {
            tags: loadedTags,
            selectedTags: initSelectedTags,
            onSelectedTagsChange: onSelectedTagsChange,
        },
        distributionMethodsField: distributionMethodsField,
        propsForLogoPath: {
            initValue: initLogoPath,
            onValueChange: onChangeLogoPath,
            placeholder: 'LogoPath',
        },
        propsForDescription: {
            initValue: initDescription,
            onValueChange: onChangeDescription,
            placeholder: 'Description',
        },
        imagePathsFieldProps: {
            initImagePaths: initImagePaths,
            onImagePathsChangeFromProps: onImagePathsChange,
        },
        buttonLabel: pathVariables.taskId ? 'UPDATE' : 'CREATE',
    } as TaskCreateViewController;
}

export default useTaskCreateViewController;
