import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import useTaskCardController, {TaskCardProps} from "src/pages/own_plugins/components/TaskCard/TaskCardViewController";
import {TaskDto} from "src/api/generated";
import decision = TaskDto.decision;


export const TaskCard = (props: TaskCardProps) => {
    let viewController = useTaskCardController(props);
    console.log("TaskCard render")
    return (
        <Card sx={{margin: 2, width: 300}}>
            <CardContent>
                <Typography>{viewController.taskDto.id}</Typography>
                <Typography color={viewController.taskDto.decision ?
                    viewController.taskDto.decision === decision.APPROVE ? "success.main" : "error" : "yellow"}>
                    {viewController.taskDto.decision || 'Не решено'}
                </Typography>
            </CardContent>
        </Card>
    );
};

