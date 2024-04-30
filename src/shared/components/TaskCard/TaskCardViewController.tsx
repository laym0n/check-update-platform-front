import {TaskDto} from "src/api/generated";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";
import {useCallback} from "react";

export type TaskCardViewController = {
    onMakeDecisionClick: React.MouseEventHandler<HTMLButtonElement>;
    taskDto: TaskDto,
    isNeedToShowButtons: boolean,
}

export type TaskCardProps = {
    onMakeDecision?: (taskDto: TaskDto) => void;
    key: string,
    taskDto: TaskDto,
}

const useTaskCardViewController: (props: TaskCardProps) => TaskCardViewController = (props: TaskCardProps) => {
    const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
    const user = authenticationService.getUser();
    const userIsEmployeeOrAdmin = user.roles
        .findIndex((role) => {
            return role === "ADMIN" || role === "EMPLOYEE";
        }) !== -1;
    let isNeedToShowButtons = !props.taskDto.decision && userIsEmployeeOrAdmin;

    const onMakeDecisionClick = useCallback(() => {
        props.onMakeDecision!(props.taskDto);
    }, [props.onMakeDecision, props.taskDto]);

    return {
        taskDto: props.taskDto,
        onMakeDecisionClick: onMakeDecisionClick,
        isNeedToShowButtons: isNeedToShowButtons,
    } as TaskCardViewController;
};
export default useTaskCardViewController;