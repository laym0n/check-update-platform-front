import React, {useCallback, useMemo, useRef} from "react";
import {PluginInfoDto} from "src/api/generated";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import {diContainer, TYPES} from "src/logic/Config";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import {AutocompleteValue} from "@mui/material";
import {
    DistributionMethodAutocompleteDto,
    mapToDistributionMethodAutocompleteDto
} from "src/shared/components/DistributionMethodAutocomplete";
import NotAuthorizedError from "src/logic/errors/NotAuthorizedError";

export type PluginCardViewController = {
    viewPageHref: string;
    onChangeDistributionMethod: (event: React.SyntheticEvent, value: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false>) => void;
    disableBuyButton: boolean,
    buyButtonToolTipTitle: string,
    pluginInfo: PluginInfoDto,
    distributionMethodAutocompleteDtoArray: DistributionMethodAutocompleteDto[],
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>,
    onViewButtonClick: React.MouseEventHandler<HTMLButtonElement>,
}

export type PluginCardProps = {
    key: string,
    pluginInfoDto: PluginInfoDto,
}

const usePluginCardController: (props: PluginCardProps) => PluginCardViewController = (props: PluginCardProps) => {
    const layoutContext = useLayoutContext();
    let autocompleteDtoArray: DistributionMethodAutocompleteDto[] = mapToDistributionMethodAutocompleteDto(props.pluginInfoDto.description.distributionMethods)
    const selectedDistributionMethod = useRef(autocompleteDtoArray[0]);
    const onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        const pluginUsageService = diContainer.get<PluginUsageService>(TYPES.PluginUsageService);
        pluginUsageService.createPluginUsage({
            pluginId: props.pluginInfoDto.id,
            distributionMethod: selectedDistributionMethod.current.distributionMethodDto,
        })
            .catch(error => {
                    if (error instanceof NotAuthorizedError) {
                        layoutContext.setIsAuthenticated(false)
                    } else {
                        console.error('Произошла ошибка:', error.message);
                    }
                }
            );
    }, [props.pluginInfoDto.id, layoutContext])

    const onViewButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    }, [])


    let onChangeDistributionMethod: (event: React.SyntheticEvent, value: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false>) => void = (event, value) => {
        selectedDistributionMethod.current = value!;
    }

    const viewPageHref = useMemo(() => {
        return "/plugin/" + props.pluginInfoDto.id
    }, [props.pluginInfoDto.id]);

    return {
        pluginInfo: props.pluginInfoDto,
        onBuyButtonClick: onBuyButtonClick,
        onViewButtonClick: onViewButtonClick,
        distributionMethodAutocompleteDtoArray: autocompleteDtoArray,
        disableBuyButton: !layoutContext.isAuthenticated,
        buyButtonToolTipTitle: layoutContext.isAuthenticated ? "" : "Необходима аутентификация",
        onChangeDistributionMethod: onChangeDistributionMethod,
        viewPageHref: viewPageHref,
    };
};
export default usePluginCardController;