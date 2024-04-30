import * as React from 'react';
import {Layout} from "src/pages/layout";
import Grid from "@mui/material/Grid";
import useTasksViewController from "src/pages/tasks/TasksViewController";
import {TaskCard} from "src/shared/components/TaskCard";
import {MakeDecisionDialog} from "src/shared/components/make_decision_dialog";
import {Card, CardContent, Chip, Typography} from "@mui/material";


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
            <MakeDecisionDialog {...viewController.makeDecisionDialogProps}/>
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
                <Grid item md={7}>
                    <Card>
                        <CardContent>
                            <Typography>{viewController.selectedTaskDto?.id}</Typography>
                            <Typography>{viewController.selectedTaskDto?.description.specificDescription?.description}</Typography>
                            {viewController.selectedTaskDto?.description.specificDescription?.imagePaths?.map(path => {
                                return <Typography key={path}>{path}</Typography>
                            })}
                            {viewController.selectedTaskDto?.description.specificDescription?.tags?.map(tag => {
                                return <Chip key={tag.tag} label={tag.tag}/>
                            })}
                            {viewController.selectedTaskDto?.description.distributionMethods?.map(method => {
                                return <Typography key={method.type}>{method.type}</Typography>
                            })}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
