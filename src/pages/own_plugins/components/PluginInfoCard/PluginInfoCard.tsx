import React from "react";
import {Box, Button, Card, Stack, Typography} from "@mui/material";
import usePluginInfoCardViewController
    from "src/pages/own_plugins/components/PluginInfoCard/PluginInfoCardViewController";
import TextField from "@mui/material/TextField";
import {AccessTokenDialog} from "src/shared/components/make_decision_dialog";


export const PluginInfoCard = () => {
    let viewController = usePluginInfoCardViewController();
    console.log("PluginInfoCard render")
    return (
        <>
            <Card sx={{
                width: '100%',
                display: !!viewController.pluginInfoDto ? 'block' : 'none'
            }}>
                <Stack width='100%' padding={1} spacing={1}>
                    <Box component="form"
                         onSubmit={viewController.onSubmitUpdate}>
                        <Stack spacing={1}
                               direction='column'>
                            <TextField label='name'
                                       fullWidth
                                       placeholder='name'
                                       value={viewController.name}
                                       onChange={viewController.onNameChange}/>
                            <TextField label='baseUrl'
                                       fullWidth
                                       placeholder='baseUrl'
                                       value={viewController.baseUrl}
                                       onChange={viewController.onBaseUrlChange}/>
                            <Button fullWidth
                                    variant="contained"
                                    type='submit'>
                                UPDATE
                            </Button>
                        </Stack>
                    </Box>
                    <Typography>{`Status ${viewController.pluginInfoDto?.status}`}</Typography>
                    <Button onClick={viewController.onRefreshClick} variant="contained">REFRESH ACCESS TOKEN</Button>
                </Stack>
            </Card>
            <AccessTokenDialog {...viewController.accessTokenDialogProps}/>
        </>
    );
};

