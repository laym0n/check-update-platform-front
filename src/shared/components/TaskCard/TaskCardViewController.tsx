import {TaskDto} from "src/api/generated";
import {useCallback} from "react";

export type TaskCardViewController = {
    isNeedToShowButtonsForResolved: boolean;
    isNeedToShowButtonsForCreator: boolean;
    createDate: string;
    onMakeDecisionClick: React.MouseEventHandler<HTMLButtonElement>;
    taskDto: TaskDto,
    isNeedToShowButtonsForEmployee: boolean,
}

export type TaskCardProps = {
    isNeedToShowButtonsForCreator: boolean;
    isNeedToShowButtonsForEmployee: boolean;
    pluginId?: string;
    onMakeDecision?: (taskDto: TaskDto) => void;
    key: string,
    taskDto: TaskDto,
}

const useTaskCardViewController: (props: TaskCardProps) => TaskCardViewController = (props: TaskCardProps) => {
    let isNeedToShowButtonsForResolved = !!props.taskDto.decision;
    let isNeedToShowButtonsForEmployee = !isNeedToShowButtonsForResolved && props.isNeedToShowButtonsForEmployee;
    let isNeedToShowButtonsForCreator = !isNeedToShowButtonsForResolved && props.isNeedToShowButtonsForCreator;
    console.log(`${isNeedToShowButtonsForResolved} ${isNeedToShowButtonsForEmployee} ${isNeedToShowButtonsForCreator}`)

    let createDate = props.taskDto.createDate

    const onMakeDecisionClick = useCallback(() => {
        props.onMakeDecision!(props.taskDto);
    }, [props.onMakeDecision, props.taskDto]);

    return {
        createDate: createDate,
        taskDto: props.taskDto,
        onMakeDecisionClick: onMakeDecisionClick,
        isNeedToShowButtonsForEmployee: isNeedToShowButtonsForEmployee,
        isNeedToShowButtonsForResolved: isNeedToShowButtonsForResolved,
        isNeedToShowButtonsForCreator: isNeedToShowButtonsForCreator,
    } as TaskCardViewController;
};
export default useTaskCardViewController;