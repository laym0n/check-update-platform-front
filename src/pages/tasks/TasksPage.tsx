import * as React from 'react';
import {Layout} from "src/pages/layout";
import Grid from "@mui/material/Grid";
import useTasksViewController from "src/pages/tasks/TasksViewController";
import {TaskCard} from "src/shared/components/TaskCard";
import {AccessTokenDialog} from "src/shared/components/make_decision_dialog";


export default function TasksPage() {
    return (
        <Layout>
            <TasksPageContent/>
        </Layout>
    );
}

function TasksPageContent() {
    let viewController = useTasksViewController();

    return (
        <>
            <AccessTokenDialog {...viewController.makeDecisionDialogProps}/>
            <Grid container columns={36}>
                <Grid item md={7}/>
                <Grid item
                      md={22}
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "center",
                      }}>
                    {
                        viewController.taskCardProps.map(taskCardProp => {
                            return <TaskCard {...taskCardProp}/>
                        })
                    }
                </Grid>
                <Grid item md={7}/>
            </Grid>
        </>
    );
}
