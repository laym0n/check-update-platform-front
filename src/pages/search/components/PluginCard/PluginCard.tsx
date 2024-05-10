import React from "react";
import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import usePluginCardController, {
    PluginCardProps
} from "src/pages/search/components/PluginCard/PluginCardViewController";
import {
    DistributionMethodAutocomplete
} from "src/shared/components/DistributionMethodAutocomplete/DistributionMethodAutocomplete";
import {BuyButton} from "src/shared/components/BuyButton/BuyButton";
import Avatar from "@mui/material/Avatar";


export const PluginCard = (props: PluginCardProps) => {
    let viewController = usePluginCardController(props);
    console.log("PluginCard render")
    return (
        <Card sx={{margin: 2, width: 300}}>
            <CardContent>
                <Avatar alt="logo"
                        src={viewController.pluginInfo.description.logoPath}
                        sx={{
                            width: 150,
                            height: 150,
                            margin: 'auto'
                        }}
                />
                <Typography>{viewController.pluginInfo.name}</Typography>
            </CardContent>
            <Stack>
                <DistributionMethodAutocomplete {...viewController.distributionMethodAutocompleteProps}/>
                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button sx={{width: '48%'}}
                            variant="contained"
                            href={viewController.viewPageHref}>VIEW</Button>
                    <BuyButton {...viewController.buyButtonProps} width='48%'/>
                </CardActions>
            </Stack>
        </Card>
    );
};

