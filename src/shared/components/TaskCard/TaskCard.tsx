import React from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import useTaskCardViewController, {TaskCardProps} from "src/shared/components/TaskCard/TaskCardViewController";
import {TaskDto} from "src/api/generated";
import decision = TaskDto.decision;


export const TaskCard = (props: TaskCardProps) => {
    let viewController = useTaskCardViewController(props);
    console.log("TaskCard render")
    return (
        <Card sx={{margin: 2, width: 300}}>
            <CardContent>
                <Typography>{viewController.taskDto.id}</Typography>
                <Typography>{viewController.taskDto.type}</Typography>
                <Typography color={viewController.taskDto.decision ?
                    viewController.taskDto.decision === decision.APPROVE ? "success.main" : "error" : "yellow"}>
                    {viewController.taskDto.decision || 'Не решено'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained"
                        target="_blank"
                        href={`/task/${props.taskDto.id}/overview`}>Посмотреть</Button>
            </CardActions>
            <CardActions sx={{display: viewController.isNeedToShowButtons ? "block" : "none"}}>
                <Button color="success"
                        variant="contained"
                        onClick={viewController.onMakeDecisionClick}>Make decision</Button>
            </CardActions>
        </Card>
    );
};

