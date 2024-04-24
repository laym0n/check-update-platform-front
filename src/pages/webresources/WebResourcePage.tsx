import * as React from 'react';
import useWebResourceViewController from "src/pages/webresources/WebResourceViewController";
import {Layout} from "src/pages/layout";
import {Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {WebResourceCardsList} from "src/pages/webresources/components/WebResourceCardsList";


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
                                    value={plugin.name}
                                    onClick={(event) => viewController.onSwitchSelectedPlugin(event, plugin.id)}>
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
                <WebResourceCardsList {...viewController.webResourceCardsListProps}/>
            </Grid>
            <Grid item md={7}/>

        </Grid>
    );
}
