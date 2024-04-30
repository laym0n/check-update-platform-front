import React from "react";
import {Layout} from "src/pages/layout";
import usePluginViewController from "src/pages/plugin/PluginViewController";
import {PluginDescription} from "src/shared/components/plugin_description";

export function PluginPage() {
    return (
        <Layout>
            <PluginPageContent/>
        </Layout>
    );
}

export function PluginPageContent() {
    let viewController = usePluginViewController()

    return (
        <PluginDescription {...viewController.pluginDescriptionProps}/>
    );
}
