import {DistributionMethodDto} from "src/api/generated";
import {useCallback, useEffect, useMemo, useState} from "react";
import moment from "moment/moment";
import type = DistributionMethodDto.type;

export type DistributionMethodOptionViewController = {
    onChangeDurationNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
    durationNumber?: number;
    onSelectedDuration: (event: React.SyntheticEvent, value: DurationOption | null) => void;
    selectedDuration?: DurationOption;
    durations: DurationOption[];
    hiddenDuration: boolean;
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

export type DurationOption = {
    label: string,
    momentString: moment.unitOfTime.DurationConstructor,
}


const useDistributionMethodOptionViewController: (props: DistributionMethodOptionProps) => DistributionMethodOptionViewController = (props) => {
    const durations = useMemo(() => [{label: 'DAY', momentString: 'days'} as DurationOption,
        {label: 'WEEK', momentString: 'weeks'} as DurationOption,
        {label: 'MONTH', momentString: 'months'} as DurationOption,
        {label: 'YEAR', momentString: 'years'} as DurationOption], [])
    const [method, setMethod] = useState(props.distributionMethodDto)
    const [selectedDuration, setSelectedDuration] = useState<DurationOption | null>(null)
    const [durationNumber, setDurationNumber] = useState<number | null>(null)
    useEffect(() => {
        setMethod(props.distributionMethodDto)
        if (!props.distributionMethodDto.duration) {
            return
        }
        const duration = moment.duration(props.distributionMethodDto.duration);
        if (duration.years()) {
            setSelectedDuration(durations[3])
            setDurationNumber(duration.years())
        } else if (duration.months()) {
            setSelectedDuration(durations[2])
            setDurationNumber(duration.months())
        } else if (duration.weeks()) {
            setSelectedDuration(durations[1])
            setDurationNumber(duration.weeks())
        } else {
            setSelectedDuration(durations[0])
            setDurationNumber(duration.days())
        }
    }, [durations, props.distributionMethodDto]);
    const onChangeType: (event: React.SyntheticEvent, value: type) => void = useCallback((event, value) => {
        method.type = value;
        setMethod(method)
        props.onDistributionMethodChange(method, props.index)
    }, [method, props]);
    const onChangeCost: (event: React.ChangeEvent<HTMLTextAreaElement>) => void = useCallback((event) => {
        method.cost = parseFloat(event.target.value);
        setMethod(method)
        props.onDistributionMethodChange(method, props.index);
    }, [method, props]);
    const onDeleteClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        props.onDeleteClick(props.index)
    }, [props]);

    const updateDuration = useCallback((durationInput: DurationOption | null, durationNumberInput: number | null) => {
        if (!durationInput || !durationNumberInput) {
            return
        }
        const parsedDuration = moment.duration(durationNumberInput, durationInput.momentString);
        const parsedDurationAsHours = moment.duration(parsedDuration.asHours(), 'hours');
        const newDuration = parsedDurationAsHours.toISOString();
        let changedMethod = {
            ...method,
            duration: newDuration,
        } as DistributionMethodDto
        // setMethod(changedMethod)
        props.onDistributionMethodChange(changedMethod, props.index);
    }, [method, props]);
    const onSelectedDuration: (event: React.SyntheticEvent, value: DurationOption | null) => void = useCallback((event, value) => {
        setSelectedDuration(value);
        updateDuration(value, durationNumber)
    }, [durationNumber, updateDuration]);
    const onChangeDurationNumber: (event: React.ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        const newDurationNumber = parseFloat(event.target.value);
        setDurationNumber(newDurationNumber);
        updateDuration(selectedDuration, newDurationNumber)
    }, [selectedDuration, updateDuration]);
    return {
        onChangeType: onChangeType,
        durations: durations,
        distributionMethod: method,
        onChangeCost: onChangeCost,
        onDeleteClick: onDeleteClick,
        hiddenDuration: method.type === DistributionMethodDto.type.PURCHASE,
        selectedDuration: selectedDuration,
        onSelectedDuration: onSelectedDuration,
        durationNumber: durationNumber,
        onChangeDurationNumber: onChangeDurationNumber,
    } as DistributionMethodOptionViewController;
}

export default useDistributionMethodOptionViewController;
