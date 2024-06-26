import * as React from 'react';
import {Layout} from "src/pages/layout";
import Grid from "@mui/material/Grid";
import useOwnPluginsViewController from "src/pages/own_plugins/OwnPluginsViewController";
import {TaskCardsList} from "src/pages/own_plugins/components";
import PluginsSelectList from "src/shared/components/PluginsSelectList/PluginsSelectList";
import {PluginSelectListContextProvider} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";
import {PluginInfoCard} from "src/pages/own_plugins/components/PluginInfoCard";


export default function OwnPluginsPage() {
    return (
        <Layout>
            <PluginSelectListContextProvider>
                <WebResourcePageContent/>
            </PluginSelectListContextProvider>
        </Layout>
    );
}

function WebResourcePageContent() {
    useOwnPluginsViewController();

    return (
        <Grid container columns={36}>
            <Grid item md={7}>
                <PluginsSelectList/>
            </Grid>
            <Grid item
                  md={22}
                  sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                  }}>
                <TaskCardsList/>
            </Grid>
            <Grid item md={7}>
                <PluginInfoCard/>
            </Grid>

        </Grid>
    );
}
