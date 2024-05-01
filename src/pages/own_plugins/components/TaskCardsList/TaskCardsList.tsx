import React from "react";
import {Button, Stack} from "@mui/material";
import {TaskCardsListProps} from "src/pages/own_plugins/components";
import useTaskCardsListViewController from "src/pages/own_plugins/components/TaskCardsList/TaskCardsListViewController";
import {TaskCard} from "src/shared/components/TaskCard";


export const TaskCardsList = (props: TaskCardsListProps) => {
    let viewController = useTaskCardsListViewController(props);
    console.log("TaskCardsList render")
    return (
        <Stack sx={{margin: 2, width: 300}}>
            <Button href={`/plugin/own/${props.pluginId}/task`}>
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

