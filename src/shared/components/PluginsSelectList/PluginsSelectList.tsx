import {Stack, Typography} from "@mui/material";
import React from "react";
import usePluginsSelectListViewController, {
    PluginsSelectListProps
} from "src/shared/components/PluginsSelectList/PluginsSelectListViewController";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import usePluginSelectViewController, {
    PluginSelectProps
} from "src/shared/components/PluginsSelectList/PluginSelectViewController";

export default function PluginsSelectList(props: PluginsSelectListProps) {
    const viewController = usePluginsSelectListViewController(props);
    return (
        <Stack direction="column" spacing={2}>
            {viewController.pluginProps?.map(propsPlugin => {
                return <PluginSelect key={propsPlugin.plugin.id} {...propsPlugin}
                                     isSelect={propsPlugin.plugin.id === viewController.selectedPluginId}/>
            })}
        </Stack>
    )
}

function PluginSelect(props: PluginSelectProps) {
    const viewController = usePluginSelectViewController(props);
    return (
        <Button value={viewController.plugin.name}
                onClick={viewController.onClick}
                variant={viewController.isSelect ? "outlined" : "text"}>
            <Stack direction="column" alignItems="center">
                {viewController.plugin.description?.logoPath &&
                    <Avatar src={viewController.plugin.description.logoPath}/>}
                <Typography>{viewController.plugin.name}</Typography>
            </Stack>
        </Button>
    )
}