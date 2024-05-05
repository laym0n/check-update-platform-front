import React from "react";
import {Box, IconButton, Stack} from "@mui/material";
import {WebResourceCard} from "src/pages/webresources/components/WebResourceCard";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import useWebResourceCardsListViewController
    from "src/pages/webresources/components/WebResourceCardsList/WebResourceCardsListViewController";


export const WebResourceCardsList = () => {
    let viewController = useWebResourceCardsListViewController();
    console.log("WebResourceCardsList render")
    return (
        <Stack spacing={1} width='100%' alignItems='center'>
            <Box component="form"
                 onSubmit={viewController.onSubmitAddNewResource}
                 sx={{
                     display: 'flex',
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                 }}>
                <TextField
                    placeholder="Link to new resource"
                    label="Link to new resource"
                    onChange={viewController.onNewValueDescriptionChange}/>
                <IconButton type="submit" aria-label="search">
                    <SearchIcon color="primary"/>
                </IconButton>
            </Box>
            <Stack>
                {viewController.cardProps.map(cardProp => {
                    return (
                        <WebResourceCard {...cardProp} onObservingChange={viewController.onObservingChange}/>
                    );
                })}
            </Stack>
        </Stack>
    );
};

