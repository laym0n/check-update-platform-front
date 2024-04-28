import React from "react";
import {Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useProfileDrawerViewController, {
    ProfileDrawerHooks
} from "src/pages/layout/components/ProfileDrawer/ProfileDrawerViewController";

export const ProfileDrawer = (props: ProfileDrawerHooks) => {
    let viewController = useProfileDrawerViewController(props);

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation">
            <List>
                <ListItem disablePadding>
                    <ListItemButton href="/webresource">
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="WebResources"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/plugin">
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Create plugin"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/plugin/own">
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Own plugins"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={viewController.onLogOutClick}>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Log Out"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <IconButton onClick={viewController.onProfileButtonClick} color="primary">
                <MenuIcon/>
            </IconButton>
            <Drawer open={viewController.open} onClose={viewController.onCloseDrawer} anchor="right">
                {DrawerList}
            </Drawer>
        </>
    );
};

