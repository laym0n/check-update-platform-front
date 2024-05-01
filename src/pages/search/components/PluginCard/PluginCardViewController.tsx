import React, {useCallback, useMemo, useRef} from "react";
import {DistributionMethodDto, PluginInfoDto} from "src/api/generated";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import {diContainer, TYPES} from "src/logic/Config";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import {DistributionMethodAutocompleteProps} from "src/shared/components/DistributionMethodAutocomplete";
import NotAuthorizedError from "src/logic/errors/NotAuthorizedError";

export type PluginCardViewController = {
    distributionMethodAutocompleteProps: DistributionMethodAutocompleteProps;
    viewPageHref: string;
    disableBuyButton: boolean,
    buyButtonToolTipTitle: string,
    pluginInfo: PluginInfoDto,
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>,
    onViewButtonClick: React.MouseEventHandler<HTMLButtonElement>,
}

export type PluginCardProps = {
    key: string,
    pluginInfoDto: PluginInfoDto,
}

const usePluginCardController: (props: PluginCardProps) => PluginCardViewController = (props: PluginCardProps) => {
    const layoutContext = useLayoutContext();
    const selectedDistributionMethod = useRef<DistributionMethodDto | undefined>(undefined);
    const onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        const pluginUsageService = diContainer.get<PluginUsageService>(TYPES.PluginUsageService);
        pluginUsageService.createPluginUsage({
            pluginId: props.pluginInfoDto.id,
            distributionMethod: selectedDistributionMethod.current!,
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


    let onChangeDistributionMethod: (value: DistributionMethodDto) => void = (value) => {
        selectedDistributionMethod.current = value!;
    }

    const viewPageHref = useMemo(() => {
        return "/plugin/" + props.pluginInfoDto.id
    }, [props.pluginInfoDto.id]);

    return {
        pluginInfo: props.pluginInfoDto,
        onBuyButtonClick: onBuyButtonClick,
        onViewButtonClick: onViewButtonClick,
        disableBuyButton: !layoutContext.isAuthenticated,
        buyButtonToolTipTitle: layoutContext.isAuthenticated ? "" : "Необходима аутентификация",
        viewPageHref: viewPageHref,
        distributionMethodAutocompleteProps: {
            distributionMethods: props.pluginInfoDto.description.distributionMethods,
            onChangeDistributionMethod: onChangeDistributionMethod,
        }
    };
};
export default usePluginCardController;