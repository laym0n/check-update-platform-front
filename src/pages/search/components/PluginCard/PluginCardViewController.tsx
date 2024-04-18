import React, {useCallback} from "react";
import {DistributionMethodDto, PluginInfoDto} from "src/api/generated";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import moment from "moment";

export type PluginCardViewController = {
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
    const onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    }, [])

    const onViewButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    }, [])

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

    return {
        pluginInfo: props.pluginInfoDto,
        onBuyButtonClick: onBuyButtonClick,
        onViewButtonClick: onViewButtonClick,
        distributionMethodAutocompleteDtoArray: autocompleteDtoArray,
        disableBuyButton: !layoutContext.isAuthenticated,
        buyButtonToolTipTitle: layoutContext.isAuthenticated ? "" : "Необходима аутентификация",
    };
};
export default usePluginCardController;

