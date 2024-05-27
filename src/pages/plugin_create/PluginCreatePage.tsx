import * as React from 'react';
import {Layout} from "src/pages/layout";
import usePluginCreateViewController from "src/pages/plugin_create/PluginCreateViewController";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AccessTokenDialog} from "src/shared/components/access_token_dialog";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {CreateStepper} from "src/pages/plugin_create/components/CreateStepper/CreateStepper";


export default function PluginCreatePage() {
    return (
        <Layout>
            <PluginCreatePageContent/>
        </Layout>
    );
}

function PluginCreatePageContent() {
    let viewController = usePluginCreateViewController();

    return (
        <>
            <Box hidden={viewController.isHiddenForm} component="form" noValidate
                 onSubmit={viewController.onClickCreate} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            onChange={viewController.onNameChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="base-url"
                            label="base-url"
                            name="base-url"
                            onChange={viewController.onBaseUrlChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Create
                </Button>
            </Box>
            <Accordion>
                <AccordionSummary>How to create plugin</AccordionSummary>
                <AccordionDetails>
                    <CreateStepper/>
                </AccordionDetails>
            </Accordion>
            <AccessTokenDialog {...viewController.accessTokenDialogProps}/>
        </>
    );
}
