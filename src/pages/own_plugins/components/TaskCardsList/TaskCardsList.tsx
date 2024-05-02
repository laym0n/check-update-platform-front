import React from "react";
import {Button, Stack} from "@mui/material";
import useTaskCardsListViewController from "src/pages/own_plugins/components/TaskCardsList/TaskCardsListViewController";
import {TaskCard} from "src/shared/components/TaskCard";


export const TaskCardsList = () => {
    let viewController = useTaskCardsListViewController();
    console.log("TaskCardsList render")
    return (
        <Stack sx={{margin: 2, width: 300}}>
            <Button href={`/plugin/own/${viewController.pluginId}/task`}>
                Создать задачу
            </Button>
            <Stack>
                {viewController.cardProps.map(cardProp => {
                    return (
                        <TaskCard {...cardProp}/>
                    );
                })}
            </Stack>
        </Stack>
    );
};

