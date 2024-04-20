import * as React from 'react';
import useWebResourceViewController from "src/pages/webresources/WebResourceViewController";
import {Layout} from "src/pages/layout";
import {Tab, Tabs} from "@mui/material";
import Avatar from "@mui/material/Avatar";


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
        <Tabs orientation="vertical"
              variant="scrollable">
            {viewController.plugins.map(plugin => {
                return (
                    <Tab icon={<Avatar src={plugin.description.logoPath}/>} label={plugin.name}/>
                );
            })}
        </Tabs>
    );
}
