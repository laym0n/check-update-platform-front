import {useCallback, useMemo, useRef} from "react";
import {DistributionMethodDto, PluginInfoDto} from "src/api/generated";
import {DistributionMethodAutocompleteProps} from "src/shared/components/DistributionMethodAutocomplete";
import {BuyButtonProps} from "src/shared/components/BuyButton";

export type PluginCardViewController = {
    buyButtonProps: BuyButtonProps;
    distributionMethodAutocompleteProps: DistributionMethodAutocompleteProps;
    viewPageHref: string;
    pluginInfo: PluginInfoDto,
}

export type PluginCardProps = {
    key: string,
    pluginInfoDto: PluginInfoDto,
}

const usePluginCardController: (props: PluginCardProps) => PluginCardViewController = (props: PluginCardProps) => {
    const selectedDistributionMethod = useRef<DistributionMethodDto | undefined>(undefined);

    let onChangeDistributionMethod: (value: DistributionMethodDto) => void = (value) => {
        selectedDistributionMethod.current = value!;
    }

    const viewPageHref = useMemo(() => {
        return "/plugin/" + props.pluginInfoDto.id
    }, [props.pluginInfoDto.id]);

    const getPluginId = useCallback(() => {
        return props.pluginInfoDto.id;
    }, [props.pluginInfoDto.id]);
    const getDistributionMethod = useCallback(() => {
        return selectedDistributionMethod.current!;
    }, []);

    return {
        pluginInfo: props.pluginInfoDto,
        buyButtonProps: {
            getPluginId: getPluginId,
            getDistributionMethod: getDistributionMethod,
        },
        viewPageHref: viewPageHref,
        distributionMethodAutocompleteProps: {
            distributionMethods: props.pluginInfoDto.description.distributionMethods,
            onChangeDistributionMethod: onChangeDistributionMethod,
        }
    };
};
export default usePluginCardController;