import React, {useCallback, useState} from 'react';
import {DistributionMethodDto, TagInfoDto} from "src/api/generated";
import {DistributionMethodAutocompleteProps} from "src/shared/components/DistributionMethodAutocomplete";
import {BuyButtonProps} from "src/shared/components/BuyButton";

export type PluginDescriptionViewController = {
    buyButtonProps: BuyButtonProps;
    distributionMethodAutocompleteProps: DistributionMethodAutocompleteProps;
    name: string,
    logoPath: string,
    description: string,
    tags: TagInfoDto[],
    imagePaths: string[],
    selectedIndexImage: number,
    onImageClick: (event: React.MouseEvent<HTMLLIElement>, index: number) => void;
}

export type PluginDescriptionProps = {
    buyButtonProps: BuyButtonProps,
    onSelectedMethodChanged?: (newMethod: DistributionMethodDto) => void;
    name: string,
    logoPath: string,
    description: string,
    tags: TagInfoDto[],
    imagePaths: string[],
    distributionMethods: DistributionMethodDto[],
}

const usePluginDescriptionViewController: (props: PluginDescriptionProps) => PluginDescriptionViewController = (props) => {
    const [selectedIndexImage, setSelectedIndexImage] = useState(0)

    let onImageClick: (event: React.MouseEvent<HTMLLIElement>, index: number) => void = useCallback((event, index) => {
        setSelectedIndexImage(index);
    }, [])

    return {
        buyButtonProps: props.buyButtonProps,
        name: props.name,
        logoPath: props.logoPath,
        description: props.description,
        tags: props.tags,
        imagePaths: props.imagePaths,
        selectedIndexImage: selectedIndexImage,
        onImageClick: onImageClick,
        distributionMethodAutocompleteProps: {
            distributionMethods: props.distributionMethods,
            onChangeDistributionMethod: props.onSelectedMethodChanged || (() => {
            }),
        }
    } as PluginDescriptionViewController;
}

export default usePluginDescriptionViewController;
