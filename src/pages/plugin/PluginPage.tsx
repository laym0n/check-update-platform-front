import React from "react";
import {Layout} from "src/pages/layout";
import usePluginViewController from "src/pages/plugin/PluginViewController";
import {PluginDescription} from "src/shared/components/plugin_description";
import {SnackbarProvider} from "notistack";

export function PluginPage() {
    return (
        <Layout>
            <SnackbarProvider maxSnack={10}>
                <PluginPageContent/>
            </SnackbarProvider>
        </Layout>
    );
}

export function PluginPageContent() {
    let viewController = usePluginViewController()

    return (
        <PluginDescription {...viewController.pluginDescriptionProps}/>
    );
}
