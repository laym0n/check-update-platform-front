import React, {MouseEventHandler} from "react";
import {Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";

export const ProfileDrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const onLogOutClick = (event: MouseEventHandler<HTMLAnchorElement>) => {
        let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        authenticationService.logOut();
    }

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={onLogOutClick}>
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
            <IconButton onClick={toggleDrawer(true)} color="primary">
                <MenuIcon/>
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
                {DrawerList}
            </Drawer>
        </>
    );
};

