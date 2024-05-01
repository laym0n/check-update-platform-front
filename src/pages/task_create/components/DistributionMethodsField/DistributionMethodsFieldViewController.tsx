import {DistributionMethodDto} from "src/api/generated";
import {useCallback, useEffect, useState} from "react";
import type = DistributionMethodDto.type;

export type DistributionMethodsFieldViewController = {
    onDistributionMethodChange: (method: DistributionMethodDto, key: number) => void;
    onDeleteMethodClick: (key: number) => void;
    onAddClick: React.MouseEventHandler<HTMLButtonElement>;
    distributionMethods: DistributionMethodDto[];
}

export type DistributionMethodsFieldProps = {
    distributionMethods?: DistributionMethodDto[];
    onDistributionMethodsChange: (methods: DistributionMethodDto[]) => void;
}


const useDistributionMethodsFieldViewController: (props: DistributionMethodsFieldProps) => DistributionMethodsFieldViewController = (props) => {
    const [methods, setMethods] = useState([] as DistributionMethodDto[])
    useEffect(() => {
        setMethods(props.distributionMethods || [])
        props.onDistributionMethodsChange(props.distributionMethods || [])
    }, [props, props.distributionMethods]);
    const onAddClick = useCallback(() => {
        const newMethods = [...methods, {
            cost: 0,
            type: type.PURCHASE,
        } as DistributionMethodDto];
        setMethods(newMethods)
        props.onDistributionMethodsChange(newMethods);
    }, [methods, props]);

    const onDistributionMethodChange: (changedMethod: DistributionMethodDto, key: number) => void = useCallback((changedMethod, key) => {
        const newMethods = [...methods];
        newMethods[key] = changedMethod;
        setMethods(newMethods)
        props.onDistributionMethodsChange(newMethods);
    }, [methods, props]);

    const onDeleteMethodClick: (key: number) => void = useCallback((key) => {
        let newMethods = [...methods];
        newMethods.splice(key, 1);
        setMethods(newMethods)
        props.onDistributionMethodsChange(newMethods);
    }, [methods, props]);

    return {
        distributionMethods: methods,
        onDeleteMethodClick: onDeleteMethodClick,
        onAddClick: onAddClick,
        onDistributionMethodChange: onDistributionMethodChange,
    } as DistributionMethodsFieldViewController;
}

export default useDistributionMethodsFieldViewController;
