import * as React from 'react';
import useTaskOverviewViewController from "src/pages/task_overview/TaskOverviewViewController";
import {PluginDescription} from "src/shared/components/plugin_description";
import {Layout} from "src/pages/layout";
import {Button} from "@mui/material";
import {MakeDecisionDialog} from "src/shared/components/make_decision_dialog";


export default function TaskOverviewPage() {
    return (
        <Layout>
            <TaskOverviewPageContent/>
        </Layout>
    );
}

function TaskOverviewPageContent() {
    const viewController = useTaskOverviewViewController();
    return (
        <>
            <span hidden={viewController.isHiddenMakeDecision}>
                <Button variant="outlined"
                    sx={{
                        position: 'absolute'
                    }}
                    onClick={viewController.handleOpenDialog}>
                    MAKE DECISION
                </Button>
                <MakeDecisionDialog {...viewController.makeDecisionDialogProps}/>
            </span>
            <PluginDescription {...viewController.pluginDescriptionProps}/>
        </>
    );
}
