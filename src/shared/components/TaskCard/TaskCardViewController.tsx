import {MakeDecisionRequestDto, TaskDto} from "src/api/generated";
import {useCallback, useState} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {MakeDecisionDto, TaskService} from "src/logic/services/Task";
import {AuthenticationService} from "src/logic/services/Authentication";
import decision = MakeDecisionRequestDto.decision;

export type TaskCardViewController = {
    onApprove: React.MouseEventHandler<HTMLButtonElement>;
    onReject: React.MouseEventHandler<HTMLButtonElement>;
    taskDto: TaskDto,
    isNeedToShowButtons: boolean,
}

export type TaskCardProps = {
    key: string,
    taskDto: TaskDto,
}

const useTaskCardViewController: (props: TaskCardProps) => TaskCardViewController = (props: TaskCardProps) => {
    const [taskDto, setTaskDto] = useState(props.taskDto)

    let sendMakeDecision = useCallback((dec: decision) => {
        const taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.makeDecision({
            taskId: props.taskDto.id,
            request: {
                decision: dec,
            } as MakeDecisionRequestDto,
        } as MakeDecisionDto)
            .then(taskDto => {
                setTaskDto(taskDto)
            })
    }, [props.taskDto.id])

    let onApprove: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        sendMakeDecision(decision.APPROVE)
    }, [sendMakeDecision])

    let onReject: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        sendMakeDecision(decision.REJECT);
    }, [sendMakeDecision])

    const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
    const user = authenticationService.getUser();
    const userIsEmployeeOrAdmin = user.roles
        .findIndex((role) => {
            return role === "ADMIN" || role === "EMPLOYEE";
        }) !== -1;
    let isNeedToShowButtons = !taskDto.decision && userIsEmployeeOrAdmin;

    return {
        taskDto: taskDto,
        onApprove: onApprove,
        onReject: onReject,
        isNeedToShowButtons: isNeedToShowButtons,
    } as TaskCardViewController;
};
export default useTaskCardViewController;