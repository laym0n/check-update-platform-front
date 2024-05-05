import React from "react";
import {Stack} from "@mui/material";
import {PluginUsageCard} from "src/pages/webresources/components/PluginUsageCard";
import usePluginUsagesListViewController
    from "src/pages/webresources/components/PluginUsagesList/PluginUsagesListViewController";


export const PluginUsagesList = () => {
    let viewController = usePluginUsagesListViewController();
    console.log("PluginUsagesList render")
    return (
        <Stack spacing={1} width='100%' alignItems='center'>
            {viewController.cardProps.map(cardProp => {
                return (
                    <PluginUsageCard {...cardProp}/>
                );
            })}
        </Stack>
    );
};

