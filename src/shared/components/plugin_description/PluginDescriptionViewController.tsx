import React, {useCallback, useState} from 'react';
import {DistributionMethodDto, TagInfoDto} from "src/api/generated";
import {
    DistributionMethodAutocompleteDto,
    mapToDistributionMethodAutocompleteDto
} from "src/shared/components/DistributionMethodAutocomplete";
import {AutocompleteValue} from "@mui/material";
import {useLayoutContext} from "src/pages/layout/LayoutContext";

export type PluginDescriptionViewController = {
    selectedMethod: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false> | undefined;
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
    onChangeDistributionMethod: (event: React.SyntheticEvent, value: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false>) => void;
    name: string,
    logoPath: string,
    description: string,
    tags: TagInfoDto[],
    imagePaths: string[],
    selectedIndexImage: number,
    distributionMethodAutocompleteDtoArray: DistributionMethodAutocompleteDto[],
    disableBuyButton: boolean,
    buyButtonToolTipTitle: string,
    onImageClick: (event: React.MouseEvent<HTMLLIElement>, index: number) => void;
}

export type PluginDescriptionProps = {
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
    onSelectedMethodChanged?: (newMethod: DistributionMethodAutocompleteDto) => void;
    name: string,
    logoPath: string,
    description: string,
    tags: TagInfoDto[],
    imagePaths: string[],
    distributionMethods: DistributionMethodDto[],
}

const usePluginDescriptionViewController: (props: PluginDescriptionProps) => PluginDescriptionViewController = (props) => {
    const layoutContext = useLayoutContext();
    const [selectedIndexImage, setSelectedIndexImage] = useState(0)
    let methodsAutocompleteDtos = mapToDistributionMethodAutocompleteDto(props.distributionMethods);
    console.log(methodsAutocompleteDtos.length ? methodsAutocompleteDtos[0] : null)
    let selectedMethod: DistributionMethodAutocompleteDto = methodsAutocompleteDtos[0];

    let onChangeDistributionMethod: (event: React.SyntheticEvent, value: AutocompleteValue<DistributionMethodAutocompleteDto, false, false, false>) => void = useCallback((event, value) => {
        if (props.onSelectedMethodChanged) {
            props.onSelectedMethodChanged(value!)
        }
    }, [props]);

    let onImageClick: (event: React.MouseEvent<HTMLLIElement>, index: number) => void = useCallback((event, index) => {
        setSelectedIndexImage(index);
    }, [])

    return {
        onBuyButtonClick: props.onBuyButtonClick,
        name: props.name,
        logoPath: props.logoPath,
        description: props.description,
        tags: props.tags,
        selectedMethod: selectedMethod,
        imagePaths: props.imagePaths,
        distributionMethodAutocompleteDtoArray: methodsAutocompleteDtos,
        selectedIndexImage: selectedIndexImage,
        onChangeDistributionMethod: onChangeDistributionMethod,
        disableBuyButton: !layoutContext.isAuthenticated,
        buyButtonToolTipTitle: layoutContext.isAuthenticated ? "" : "Необходима аутентификация",
        onImageClick: onImageClick,
    } as PluginDescriptionViewController;
}

export default usePluginDescriptionViewController;
