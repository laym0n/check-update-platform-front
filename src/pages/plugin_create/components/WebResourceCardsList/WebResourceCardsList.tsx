import React from "react";
import {Box, IconButton, Stack} from "@mui/material";
import {WebResourceCard} from "src/pages/webresources/components/WebResourceCard";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import useWebResourceCardsListViewController, {
    WebResourceCardsListProps
} from "src/pages/webresources/components/WebResourceCardsList/WebResourceCardsListViewController";


export const WebResourceCardsList = (props: WebResourceCardsListProps) => {
    let viewController = useWebResourceCardsListViewController(props);
    console.log("WebResourceCardsList render")
    return (
        <Stack sx={{margin: 2, width: 300}}>
            <Box component="form" onSubmit={viewController.onSubmitAddNewResource}>
                <TextField
                    placeholder="newResource"
                    label="bewResource"
                    onChange={viewController.onNewValueDescriptionChange}/>
                <IconButton type="submit" aria-label="search">
                    <SearchIcon color="primary"/>
                </IconButton>
            </Box>
            <Stack>
                {viewController.cardProps.map(cardProp => {
                    return (
                        <WebResourceCard {...cardProp}/>
                    );
                })}
            </Stack>
        </Stack>
    );
};

