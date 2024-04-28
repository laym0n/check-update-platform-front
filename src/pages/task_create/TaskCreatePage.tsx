import * as React from 'react';
import {Layout} from "src/pages/layout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useTaskCreateViewController from "src/pages/task_create/TaskCreateViewController";


export default function TaskCreatePage() {
    return (
        <Layout>
            <TaskCreatePageContent/>
        </Layout>
    );
}

function TaskCreatePageContent() {
    let viewController = useTaskCreateViewController();

    return (
        <>
            <Box component="form" noValidate onSubmit={viewController.onClickCreate} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            // onChange={viewController.onNameChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="base-url"
                            label="base-url"
                            name="base-url"
                            // onChange={viewController.onBaseUrlChange}
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
        </>
    );
}
