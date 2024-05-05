import React from "react";
import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import useTaskCardViewController, {TaskCardProps} from "src/shared/components/TaskCard/TaskCardViewController";
import {TaskDto} from "src/api/generated";
import decision = TaskDto.decision;


export const TaskCard = (props: TaskCardProps) => {
    let viewController = useTaskCardViewController(props);
    console.log("TaskCard render")
    return (
        <Card sx={{margin: 2, width: 400}}>
            <CardContent>
                <Typography margin={1}>{`Type: ${viewController.taskDto.type}`}</Typography>
                <Typography margin={1}>{`Created: ${viewController.createDate}`}</Typography>
                <Typography margin={1} color={viewController.taskDto.decision ?
                    viewController.taskDto.decision === decision.APPROVE ? "success.main" : "error" : "yellow"}>
                    {viewController.taskDto.decision || 'IN PROCESS'}
                </Typography>
            </CardContent>
            <CardActions sx={{display: viewController.isNeedToShowButtonsForCreator ? "block" : "none"}}>
                <Stack direction='row' width='100%' spacing={1}>
                    <Button variant="contained"
                            fullWidth
                            target="_blank"
                            href={`/task/${props.taskDto.id}/overview`}>VIEW</Button>
                    <Button variant="contained"
                            fullWidth
                            href={`/plugin/own/${props.pluginId}/task/${props.taskDto.id}`}>UPDATE</Button>
                    <Button variant="contained"
                            fullWidth
                            color="error"
                            onClick={viewController.onClickRejectByCreator}>REJECT</Button>
                </Stack>
            </CardActions>
            <CardActions sx={{display: viewController.isNeedToShowButtonsForEmployee ? "block" : "none"}}>
                <Stack direction='row' width='100%' spacing={1}>
                    <Button variant="contained"
                            fullWidth
                            target="_blank"
                            href={`/task/${props.taskDto.id}/overview`}>VIEW</Button>
                    <Button color="success"
                            fullWidth
                            variant="contained"
                            onClick={viewController.onMakeDecisionClick}>MAKE DECISION</Button>
                </Stack>
            </CardActions>
            <CardActions sx={{display: viewController.isNeedToShowButtonsForResolved ? "block" : "none"}}>
                <Stack direction='row' width='100%' spacing={1}>
                    <Button variant="contained"
                            fullWidth
                            target="_blank"
                            href={`/task/${props.taskDto.id}/overview`}>VIEW</Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

