import * as React from 'react';
import {Layout} from "src/pages/layout";
import {Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useOwnPluginsViewController from "src/pages/own_plugins/OwnPluginsViewController";
import {TaskCardsList} from "src/pages/own_plugins/components";


export default function OwnPluginsPage() {
    return (
        <Layout>
            <WebResourcePageContent/>
        </Layout>
    );
}

function WebResourcePageContent() {
    let viewController = useOwnPluginsViewController();

    return (
        <Grid container columns={36}>
            <Grid item md={7}>
                <Stack direction="column">
                    {viewController.plugins?.map(plugin => {
                        return (
                            <Button key={plugin.id}
                                    value={plugin.name}
                                    onClick={(event) => viewController.onSwitchSelectedPlugin(event, plugin.id)}>
                                <Stack>
                                    {plugin.description?.logoPath && <Avatar src={plugin.description.logoPath}/>}
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
                <TaskCardsList {...viewController.taskCardListProps}/>
            </Grid>
            <Grid item md={7}/>

        </Grid>
    );
}
