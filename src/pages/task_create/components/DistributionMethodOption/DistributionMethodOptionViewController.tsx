import {DistributionMethodDto} from "src/api/generated";
import {useCallback, useEffect, useState} from "react";
import type = DistributionMethodDto.type;

export type DistributionMethodOptionViewController = {
    onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
    onChangeCost: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeType: (event: React.SyntheticEvent, value: type | null) => void;
    distributionMethod: DistributionMethodDto,
}

export type DistributionMethodOptionProps = {
    onDistributionMethodChange: (method: DistributionMethodDto, key: number) => void;
    onDeleteClick: (key: number) => void;
    index: number,
    distributionMethodDto: DistributionMethodDto;
}


const useDistributionMethodOptionViewController: (props: DistributionMethodOptionProps) => DistributionMethodOptionViewController = (props) => {
    const [method, setMethod] = useState(props.distributionMethodDto)
    useEffect(() => {
        setMethod(props.distributionMethodDto)
    }, [props.distributionMethodDto]);
    const onChangeType: (event: React.SyntheticEvent, value: type) => void = useCallback((event, value) => {
        method.type = value;
        setMethod(method)
        props.onDistributionMethodChange(method, props.index)
    }, [method, props]);
    const onChangeCost: (event: React.ChangeEvent<HTMLTextAreaElement>) => void = useCallback((event) => {
        method.cost = Number.parseFloat(event.target.value);
        setMethod(method)
        props.onDistributionMethodChange(method, props.index);
    }, [method, props]);
    const onDeleteClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        props.onDeleteClick(props.index)
    }, [props]);
    return {
        onChangeType: onChangeType,
        distributionMethod: method,
        onChangeCost: onChangeCost,
        onDeleteClick: onDeleteClick,
    } as DistributionMethodOptionViewController;
}

export default useDistributionMethodOptionViewController;
