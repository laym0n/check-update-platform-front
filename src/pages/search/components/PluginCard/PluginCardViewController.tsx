import React, {useCallback, useRef} from "react";
import {DistributionMethodDto, PluginInfoDto} from "src/api/generated";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import moment from "moment";
import {diContainer, TYPES} from "src/logic/Config";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import {AutocompleteValue} from "@mui/material";

export type PluginCardViewController = {
    onChangeDistributionMethod: (event: React.SyntheticEvent, value: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false>) => void;
    disableBuyButton: boolean,
    buyButtonToolTipTitle: string,
    pluginInfo: PluginInfoDto,
    distributionMethodAutocompleteDtoArray: DistributionMethodAutocompleteDto[]
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>,
    onViewButtonClick: React.MouseEventHandler<HTMLButtonElement>,
}

type DistributionMethodAutocompleteDto = {
    label: string,
    distributionMethodDto: DistributionMethodDto
}

export type PluginCardProps = {
    key: string,
    pluginInfoDto: PluginInfoDto,
}

const usePluginCardController: (props: PluginCardProps) => PluginCardViewController = (props: PluginCardProps) => {
    const layoutContext = useLayoutContext();
    let autocompleteDtoArray: DistributionMethodAutocompleteDto[] = (props.pluginInfoDto.description.distributionMethods || []).map((method) => {
        let label: string;
        if (method.type === DistributionMethodDto.type.PURCHASE) {
            label = `${method.cost} РУБ`
        } else {
            let duration = moment.duration(method.duration!).humanize()
            label = `${method.cost} РУБ/${duration}`
        }
        return {
            label: label,
            distributionMethodDto: method
        } as DistributionMethodAutocompleteDto;
    })
    const selectedDistributionMethod = useRef(autocompleteDtoArray[0]);
    const onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        const pluginUsageService = diContainer.get<PluginUsageService>(TYPES.PluginUsageService);
        pluginUsageService.createPluginUsage({
            pluginId: props.pluginInfoDto.id,
            distributionMethod: selectedDistributionMethod.current.distributionMethodDto,
        })
    }, [props.pluginInfoDto.id])

    const onViewButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    }, [])


    let onChangeDistributionMethod: (event: React.SyntheticEvent, value: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false>) => void = (event, value) => {
        selectedDistributionMethod.current = value!;
    }

    return {
        pluginInfo: props.pluginInfoDto,
        onBuyButtonClick: onBuyButtonClick,
        onViewButtonClick: onViewButtonClick,
        distributionMethodAutocompleteDtoArray: autocompleteDtoArray,
        disableBuyButton: !layoutContext.isAuthenticated,
        buyButtonToolTipTitle: layoutContext.isAuthenticated ? "" : "Необходима аутентификация",
        onChangeDistributionMethod: onChangeDistributionMethod
    };
};
export default usePluginCardController;

