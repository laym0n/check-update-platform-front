import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import useTaskCardController, {TaskCardProps} from "src/pages/own_plugins/components/TaskCard/TaskCardViewController";


export const TaskCard = (props: TaskCardProps) => {
    let viewController = useTaskCardController(props);
    console.log("TaskCard render")
    return (
        <Card sx={{margin: 2, width: 300}}>
            <CardContent>
                <Typography>{viewController.taskDto.id}</Typography>
            </CardContent>
        </Card>
    );
};

