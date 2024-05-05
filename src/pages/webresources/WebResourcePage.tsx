import * as React from 'react';
import useWebResourceViewController from "src/pages/webresources/WebResourceViewController";
import {Layout} from "src/pages/layout";
import Grid from "@mui/material/Grid";
import {WebResourceCardsList} from "src/pages/webresources/components/WebResourceCardsList";
import PluginsSelectList from "src/shared/components/PluginsSelectList/PluginsSelectList";
import {PluginSelectListContextProvider} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";


export default function WebResourcePage() {
    return (
        <Layout>
            <PluginSelectListContextProvider>
                <WebResourcePageContent/>
            </PluginSelectListContextProvider>
        </Layout>
    );
}

function WebResourcePageContent() {
    let viewController = useWebResourceViewController();

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
                <WebResourceCardsList/>
            </Grid>
            <Grid item md={7}/>

        </Grid>
    );
}
