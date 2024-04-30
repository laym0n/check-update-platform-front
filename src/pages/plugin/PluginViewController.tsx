import React, {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {useParams} from "react-router-dom";
import {DistributionMethodAutocompleteDto} from "src/shared/components/DistributionMethodAutocomplete";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import NotAuthorizedError from "src/logic/errors/NotAuthorizedError";
import {PluginDescriptionProps} from "src/shared/components/plugin_description/PluginDescriptionViewController";
import {TagInfoDto} from "src/api/generated";

export type PluginViewController = {
    pluginDescriptionProps: PluginDescriptionProps;
}

type PluginPagePathVariables = {
    id: string;
};

const usePluginViewController: () => PluginViewController = () => {
    const layoutContext = useLayoutContext();
    const [pluginDescriptionProps, setPluginDescriptionProps] = useState<PluginDescriptionProps>({} as PluginDescriptionProps)
    const pluginPagePathVariables = useParams<PluginPagePathVariables>();
    const selectedMethod = useRef<DistributionMethodAutocompleteDto>();

    const onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        const pluginUsageService = diContainer.get<PluginUsageService>(TYPES.PluginUsageService);
        pluginUsageService.createPluginUsage({
            pluginId: pluginPagePathVariables.id!,
            distributionMethod: selectedMethod.current!.distributionMethodDto,
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

    const onSelectedMethodChanged = useCallback((newMethod: DistributionMethodAutocompleteDto) => {
        selectedMethod.current = newMethod;
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
                setPluginDescriptionProps({
                    name: pluginInfoDto.name,
                    tags: tags,
                    logoPath: pluginInfoDto.description.logoPath,
                    imagePaths: pluginInfoDto.description.specificDescription?.imagePaths,
                    description: pluginInfoDto.description.specificDescription?.description,
                    distributionMethods: pluginInfoDto.description.distributionMethods,
                    onBuyButtonClick: onBuyButtonClick,
                    onSelectedMethodChanged: onSelectedMethodChanged,
                } as PluginDescriptionProps)
            });
    }, [onBuyButtonClick, onSelectedMethodChanged, pluginPagePathVariables.id]);

    return {
        pluginDescriptionProps: pluginDescriptionProps,
    } as PluginViewController;
}

export default usePluginViewController;
