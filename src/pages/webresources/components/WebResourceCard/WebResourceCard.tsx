import React from "react";
import {Card, CardActions, CardContent, CardHeader, Stack, Switch, Typography} from "@mui/material";
import {WebResourceCardProps} from "src/pages/webresources/components/WebResourceCard";
import useWebResourceCardController
    from "src/pages/webresources/components/WebResourceCard/WebResourceCardViewController";
import {WebResourceObservingDto} from "src/api/generated";
import status = WebResourceObservingDto.status;


export const WebResourceCard = (props: WebResourceCardProps) => {
    let viewController = useWebResourceCardController(props);
    console.log("WebResourceCard render")
    return (
        <Card sx={{margin: 2, width: 500}}>
            <CardHeader title={viewController.webResourceObserving.webResourceDto.descriptionHeader}/>
            <CardContent>
                {viewController.descriptionsRows.map((row, index) => {
                    return <Typography key={index}>{row}</Typography>
                })}
            </CardContent>
            <Stack>
                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Switch checked={viewController.webResourceObserving.status === status.OBSERVE}
                            onChange={viewController.onChangeNeedNotify}/>
                </CardActions>
            </Stack>
        </Card>
    );
};

