import React from "react";
import {Card, CardContent, CardHeader, Stack, Typography} from "@mui/material";
import usePluginUsageCardController, {
    PluginUsageCardProps
} from "src/pages/webresources/components/PluginUsageCard/PluginUsageCardViewController";


export const PluginUsageCard = (props: PluginUsageCardProps) => {
    let viewController = usePluginUsageCardController(props);
    console.log("PluginUsageCard render")
    return (
        <Card sx={{margin: 2, width: 500}}>
            <CardHeader title={viewController.pluginUsageDto.distributionMethod.type}/>
            <CardContent>
                <Stack spacing={1} direction="column">
                    <Typography>{`Cost ${viewController.pluginUsageDto.distributionMethod.cost}`}</Typography>
                    {viewController.duration &&
                        <Typography>{`Duration ${viewController.duration}`}</Typography>}
                    {viewController.pluginUsageDto.expiredDate &&
                        <Typography>{`Expired date ${viewController.pluginUsageDto.expiredDate}`}</Typography>}
                </Stack>
            </CardContent>
        </Card>
    );
};

