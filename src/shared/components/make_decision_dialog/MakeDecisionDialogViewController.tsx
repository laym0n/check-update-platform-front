import {useCallback, useRef} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {MakeDecisionDto, TaskService} from "src/logic/services/Task";
import {MakeDecisionRequestDto, TaskDto} from "src/api/generated";
import decision = MakeDecisionRequestDto.decision;

export type MakeDecisionDialogViewController = {
    onApproveClick: React.MouseEventHandler<HTMLButtonElement>;
    onRejectClick: React.MouseEventHandler<HTMLButtonElement>;
    onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleCloseDialog: () => void;
    isOpenDialog: boolean;
}

export type MakeDecisionDialogProps = {
    handleMakeDecisionCallback: ((value: TaskDto) => (PromiseLike<TaskDto> | TaskDto)) | undefined | null;
    handleCloseDialog: () => void;
    isOpenDialog: boolean;
    getTaskId: () => string,
}

const useMakeDecisionDialogViewController: (props: MakeDecisionDialogProps) => MakeDecisionDialogViewController = (props) => {
    const commentField = useRef('');

    const onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = useCallback((event) => {
        commentField.current = event.target.value;
    }, []);

    let sendMakeDecision = useCallback((dec: decision) => {
        const taskService = diContainer.get<TaskService>(TYPES.TaskService);
        taskService.makeDecision({
            taskId: props.getTaskId(),
            request: {
                decision: dec,
                comment: commentField.current,
            } as MakeDecisionRequestDto,
        } as MakeDecisionDto)
            .then(props.handleMakeDecisionCallback)
    }, [props])

    const onApproveClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        sendMakeDecision(decision.APPROVE)
    }, [sendMakeDecision]);
    const onRejectClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        sendMakeDecision(decision.REJECT)
    }, [sendMakeDecision]);

    return {
        isOpenDialog: props.isOpenDialog,
        handleCloseDialog: props.handleCloseDialog,
        onCommentChange: onCommentChange,
        onApproveClick: onApproveClick,
        onRejectClick: onRejectClick,
    } as MakeDecisionDialogViewController;
}

export default useMakeDecisionDialogViewController;
