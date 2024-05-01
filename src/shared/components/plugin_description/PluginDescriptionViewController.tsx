import React, {useCallback, useState} from 'react';
import {DistributionMethodDto, TagInfoDto} from "src/api/generated";
import {DistributionMethodAutocompleteProps} from "src/shared/components/DistributionMethodAutocomplete";
import {useLayoutContext} from "src/pages/layout/LayoutContext";

export type PluginDescriptionViewController = {
    distributionMethodAutocompleteProps: DistributionMethodAutocompleteProps;
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
    name: string,
    logoPath: string,
    description: string,
    tags: TagInfoDto[],
    imagePaths: string[],
    selectedIndexImage: number,
    disableBuyButton: boolean,
    buyButtonToolTipTitle: string,
    onImageClick: (event: React.MouseEvent<HTMLLIElement>, index: number) => void;
}

export type PluginDescriptionProps = {
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
    onSelectedMethodChanged?: (newMethod: DistributionMethodDto) => void;
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

    let onImageClick: (event: React.MouseEvent<HTMLLIElement>, index: number) => void = useCallback((event, index) => {
        setSelectedIndexImage(index);
    }, [])

    return {
        onBuyButtonClick: props.onBuyButtonClick,
        name: props.name,
        logoPath: props.logoPath,
        description: props.description,
        tags: props.tags,
        imagePaths: props.imagePaths,
        selectedIndexImage: selectedIndexImage,
        disableBuyButton: !layoutContext.isAuthenticated,
        buyButtonToolTipTitle: layoutContext.isAuthenticated ? "" : "Необходима аутентификация",
        onImageClick: onImageClick,
        distributionMethodAutocompleteProps: {
            distributionMethods: props.distributionMethods,
            onChangeDistributionMethod: props.onSelectedMethodChanged,
        }
    } as PluginDescriptionViewController;
}

export default usePluginDescriptionViewController;
