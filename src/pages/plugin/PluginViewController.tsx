import React, {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {useParams} from "react-router-dom";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import NotAuthorizedError from "src/logic/errors/NotAuthorizedError";
import {PluginDescriptionProps} from "src/shared/components/plugin_description/PluginDescriptionViewController";
import {CreateOrUpdateFeedbackRequestDto, DistributionMethodDto, FeedbackDto, TagInfoDto} from "src/api/generated";
import {FeedbackService} from "src/logic/services/Feedback";
import {AuthenticationService} from "src/logic/services/Authentication";
import {CommentsBoxProps} from "src/shared/components/plugin_description/components/CommentsBox";

export type PluginViewController = {
    pluginDescriptionProps: PluginDescriptionProps;
}

type PluginPagePathVariables = {
    id: string;
};

const usePluginViewController: () => PluginViewController = () => {
    const layoutContext = useLayoutContext();
    const pluginPagePathVariables = useParams<PluginPagePathVariables>();

    const onSubmitComment: (request: CreateOrUpdateFeedbackRequestDto) => void = useCallback((request) => {
        request = {
            ...request,
            pluginId: pluginPagePathVariables.id!,
        }
        const feedbackService = diContainer.get<FeedbackService>(TYPES.FeedbackService);
        feedbackService.giveFeedBack(request)
            .then(feedback => {
                setPluginDescriptionProps(prevState => {
                    return {
                        ...prevState,
                        commentsBoxProps: {
                            ...prevState.commentsBoxProps,
                            initFeedback: feedback,
                        }
                    }
                })
            })
    }, [pluginPagePathVariables.id]);
    const [pluginDescriptionProps, setPluginDescriptionProps] = useState<PluginDescriptionProps>({
        commentsBoxProps: {
            initFeedback: {} as FeedbackDto,
            feedbacks: [] as FeedbackDto[],
            onSubmitComment: onSubmitComment,
        } as CommentsBoxProps
    } as unknown as PluginDescriptionProps)
    const selectedMethod = useRef<DistributionMethodDto>();

    const onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        const pluginUsageService = diContainer.get<PluginUsageService>(TYPES.PluginUsageService);
        pluginUsageService.createPluginUsage({
            pluginId: pluginPagePathVariables.id!,
            distributionMethod: selectedMethod.current!,
        })
            .catch(error => {
                    if (error instanceof NotAuthorizedError) {
                        layoutContext.setIsAuthenticated(false)
                    } else {
                        console.error('Произошла ошибка:', error.message);
                    }
                }
            );
    }, [layoutContext, pluginPagePathVariables.id])

    const onSelectedMethodChanged = useCallback((newMethod: DistributionMethodDto) => {
        selectedMethod.current = newMethod;
    }, []);

    const getPluginId = useCallback(() => {
        return pluginPagePathVariables.id;
    }, [pluginPagePathVariables.id]);

    const getDistributionMethod = useCallback(() => {
        return selectedMethod.current
    }, []);

    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getPlugins({
            ids: [pluginPagePathVariables.id!]
        })
            .then(response => {
                const pluginInfoDto = response.plugins[0];
                const tags = pluginInfoDto.description.specificDescription?.tags?.map(tag => {
                    return {
                        tag: tag,
                        isNew: false,
                    } as TagInfoDto
                });
                setPluginDescriptionProps((prevState) => {
                    return {
                        ...prevState,
                        name: pluginInfoDto.name,
                        tags: tags,
                        logoPath: pluginInfoDto.description.logoPath,
                        imagePaths: pluginInfoDto.description.specificDescription?.imagePaths,
                        description: pluginInfoDto.description.specificDescription?.description,
                        distributionMethods: pluginInfoDto.description.distributionMethods,
                        onSelectedMethodChanged: onSelectedMethodChanged,
                        buyButtonProps:
                            {
                                getPluginId: getPluginId,
                                isDisabled: false,
                                getDistributionMethod: getDistributionMethod,
                            },
                    } as PluginDescriptionProps
                })
            });
    }, [getDistributionMethod, getPluginId, onBuyButtonClick, onSelectedMethodChanged, pluginPagePathVariables.id]);

    useEffect(() => {
        let userIdsArray: string[] = [];
        if (layoutContext.isAuthenticated) {
            const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
            const user = authenticationService.getUser();
            userIdsArray = [user.id];
        }

        const feedbackService = diContainer.get<FeedbackService>(TYPES.FeedbackService);
        feedbackService.get({excludedUserIds: userIdsArray, pluginIds: [pluginPagePathVariables.id!]})
            .then(response => {
                setPluginDescriptionProps((prevState) => {
                    return {
                        ...prevState,
                        commentsBoxProps: {
                            ...prevState.commentsBoxProps,
                            feedbacks: response.feedbacks,
                        }
                    } as PluginDescriptionProps
                })
            })
        setPluginDescriptionProps((prevState) => {
            return {
                ...prevState,
                commentsBoxProps: {
                    ...prevState.commentsBoxProps,
                    isHiddenForm: !layoutContext.isAuthenticated,
                }
            } as PluginDescriptionProps
        })
        if (!layoutContext.isAuthenticated) {
            return
        }
        feedbackService.get({userIds: userIdsArray, pluginIds: [pluginPagePathVariables.id!]})
            .then(response => {
                setPluginDescriptionProps((prevState) => {
                    return {
                        ...prevState,
                        commentsBoxProps: {
                            ...prevState.commentsBoxProps,
                            initFeedback: response.feedbacks[0],
                        }
                    } as PluginDescriptionProps
                })
            });
    }, [layoutContext.isAuthenticated, pluginPagePathVariables.id]);

    return {
        pluginDescriptionProps: pluginDescriptionProps,
    } as PluginViewController;
}

export default usePluginViewController;
