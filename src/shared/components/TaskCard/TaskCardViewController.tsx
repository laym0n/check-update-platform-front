import {TaskDto} from "src/api/generated";
import {useCallback} from "react";

export type TaskCardViewController = {
    onClickRejectByCreator: React.MouseEventHandler<HTMLButtonElement>;
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
    onMakeDecisionByCreator?: (taskDto: TaskDto) => void;
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

    const onClickRejectByCreator: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        props.onMakeDecisionByCreator!(props.taskDto);
    }, [props.onMakeDecisionByCreator, props.taskDto]);

    return {
        createDate: createDate,
        taskDto: props.taskDto,
        onMakeDecisionClick: onMakeDecisionClick,
        isNeedToShowButtonsForEmployee: isNeedToShowButtonsForEmployee,
        isNeedToShowButtonsForResolved: isNeedToShowButtonsForResolved,
        isNeedToShowButtonsForCreator: isNeedToShowButtonsForCreator,
        onClickRejectByCreator: onClickRejectByCreator,
    } as TaskCardViewController;
};
export default useTaskCardViewController;