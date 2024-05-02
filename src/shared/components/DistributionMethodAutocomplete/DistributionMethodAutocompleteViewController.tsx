import {DistributionMethodDto} from "src/api/generated";
import moment from "moment/moment";
import {useCallback, useEffect, useState} from "react";

export type DistributionMethodAutocompleteViewController = {
    onChangeDistributionMethod: (event: React.SyntheticEvent, value: DistributionMethodAutocompleteDto | null) => void;
    selectedValue: DistributionMethodAutocompleteDto | undefined;
    distributionMethods: DistributionMethodAutocompleteDto[],
}

export type DistributionMethodAutocompleteDto = {
    label: string,
    distributionMethodDto: DistributionMethodDto
}

export type DistributionMethodAutocompleteProps = {
    distributionMethods?: DistributionMethodDto[],
    onChangeDistributionMethod: (method: DistributionMethodDto) => void,
}

const useDistributionMethodAutocompleteViewController: (props: DistributionMethodAutocompleteProps) => DistributionMethodAutocompleteViewController = (props) => {
    const [distributionMethods, setDistributionMethods] = useState([] as DistributionMethodAutocompleteDto[])
    const [selectedValue, setSelectedValue] = useState<DistributionMethodAutocompleteDto>({
        label: '',
        distributionMethodDto: {}
    } as DistributionMethodAutocompleteDto)

    useEffect(() => {
        let newMethodAutocompletes = (props.distributionMethods || [])
            .map(method => {
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
        setDistributionMethods(newMethodAutocompletes)
        if (newMethodAutocompletes && newMethodAutocompletes.length) {
            setSelectedValue(newMethodAutocompletes[0])
            props.onChangeDistributionMethod(newMethodAutocompletes[0].distributionMethodDto)
        }
    }, [props]);

    const onChangeDistributionMethod: (event: React.SyntheticEvent, value: DistributionMethodAutocompleteDto | null) => void = useCallback((event, newSelectedValue) => {
        if (!newSelectedValue) {
            return
        }
        setSelectedValue(newSelectedValue);
        props.onChangeDistributionMethod(newSelectedValue.distributionMethodDto)
    }, [props]);

    return {
        distributionMethods: distributionMethods,
        selectedValue: selectedValue,
        onChangeDistributionMethod: onChangeDistributionMethod,
    } as DistributionMethodAutocompleteViewController;
}

export default useDistributionMethodAutocompleteViewController;