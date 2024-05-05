import React from "react";
import {Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useProfileDrawerViewController, {
    ProfileDrawerHooks
} from "src/pages/layout/components/ProfileDrawer/ProfileDrawerViewController";
import TaskIcon from '@mui/icons-material/Task';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

export const ProfileDrawer = (props: ProfileDrawerHooks) => {
    let viewController = useProfileDrawerViewController(props);

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation">
            <List>
                <ListItem disablePadding>
                    <ListItemButton href="/webresource">
                        <ListItemIcon>
                            <LocationSearchingIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="WebResources"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/plugin">
                        <ListItemIcon>
                            <AddCircleIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Create plugin"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/plugin/own">
                        <ListItemIcon>
                            <ManageAccountsIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Own plugins"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{display: viewController.isHiddenTasks ? 'none' : 'block'}}>
                    <ListItemButton href="/tasks">
                        <ListItemIcon>
                            <TaskIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Tasks"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={viewController.onLogOutClick}>
                        <ListItemIcon>
                            <LogoutIcon color="primary"/>
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

