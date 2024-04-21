import React, {useCallback, useEffect, useRef, useState} from 'react';
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {useParams} from "react-router-dom";
import {PluginInfoDto} from "src/api/generated";
import {
    DistributionMethodAutocompleteDto,
    mapToDistributionMethodAutocompleteDto
} from "src/shared/components/DistributionMethodAutocomplete";
import {AutocompleteValue} from "@mui/material";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import NotAuthorizedError from "src/logic/errors/NotAuthorizedError";

export type PluginViewController = {
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
    onChangeDistributionMethod: (event: React.SyntheticEvent, value: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false>) => void;
    pluginInfo: PluginInfoDto | null,
    selectedIndexImage: number,
    distributionMethodAutocompleteDtoArray: DistributionMethodAutocompleteDto[],
    disableBuyButton: boolean,
    buyButtonToolTipTitle: string,
    onImageClick: (event: React.MouseEvent<HTMLLIElement>, index: number) => void;
}

type PluginPagePathVariables = {
    id: string;
};

const usePluginViewController: () => PluginViewController = () => {
    const layoutContext = useLayoutContext();
    const [pluginInfo, setPluginInfo] = useState<PluginInfoDto | null>(null)
    const [selectedIndexImage, setSelectedIndexImage] = useState(0)
    const [methodsAutocompleteDtos, setMethodsAutocompleteDtos] = useState([] as DistributionMethodAutocompleteDto[])
    const pluginPagePathVariables = useParams<PluginPagePathVariables>();
    const selectedMethod = useRef<DistributionMethodAutocompleteDto | null>(null);

    useEffect(() => {
        let pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.getPlugins({
            ids: [pluginPagePathVariables.id!]
        })
            .then(response => {
                setPluginInfo(response.plugins[0]);
                let autocompleteDtos = mapToDistributionMethodAutocompleteDto(response.plugins[0].description.distributionMethods)
                setMethodsAutocompleteDtos(autocompleteDtos)
                selectedMethod.current = autocompleteDtos[0];
            });
    }, [pluginPagePathVariables.id]);

    let onChangeDistributionMethod: (event: React.SyntheticEvent, value: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false>) => void = (event, value) => {
        selectedMethod.current = value!;
    }

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

    let onImageClick: (event: React.MouseEvent<HTMLLIElement>, index: number) => void = useCallback((event, index) => {
        setSelectedIndexImage(index);
    }, [])

    return {
        pluginInfo: pluginInfo,
        distributionMethodAutocompleteDtoArray: methodsAutocompleteDtos,
        selectedIndexImage: selectedIndexImage,
        onChangeDistributionMethod: onChangeDistributionMethod,
        onBuyButtonClick: onBuyButtonClick,
        disableBuyButton: !layoutContext.isAuthenticated,
        buyButtonToolTipTitle: layoutContext.isAuthenticated ? "" : "Необходима аутентификация",
        onImageClick: onImageClick,
    } as PluginViewController;
}

export default usePluginViewController;
