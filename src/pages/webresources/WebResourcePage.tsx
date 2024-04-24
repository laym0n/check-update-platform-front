import * as React from 'react';
import useWebResourceViewController from "src/pages/webresources/WebResourceViewController";
import {Layout} from "src/pages/layout";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {WebResourceCard} from "src/pages/webresources/components";
import Grid from "@mui/material/Grid";


export default function WebResourcePage() {
    return (
        <Layout>
            <WebResourcePageContent/>
        </Layout>
    );
}

function WebResourcePageContent() {
    let viewController = useWebResourceViewController();

    return (
        <Grid container columns={36}>
            <Grid item md={7}>
                <Stack direction="column">
                    {viewController.plugins?.map(plugin => {
                        return (
                            <Button key={plugin.id}
                                    value={plugin.name}>
                                <Stack>
                                    <Avatar src={plugin.description.logoPath}/>
                                    <Typography>{plugin.name}</Typography>
                                </Stack>
                            </Button>
                        );
                    })}
                </Stack>
            </Grid>
            <Grid item
                  md={22}
                  sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                  }}>
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
            </Grid>
            <Grid item md={7}/>

        </Grid>
    );
}
