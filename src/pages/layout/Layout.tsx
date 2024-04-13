import React, {ReactNode} from "react";
import {SignInButton, SignUpButton} from "src/components/SignInUpButtons";
import {ProfileDrawer} from "src/components/ProfileDrawer";
import {Box, Divider, Stack} from "@mui/material";
import {darkTheme} from "src/components/styles/theme"
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import {SearchBar} from "src/components";
import {alpha} from '@mui/system';
import useLayoutViewController from "src/pages/layout/LayoutViewController";

type LayoutProperties = {
    children: ReactNode;
}

export function Layout(properties: LayoutProperties) {
    let viewController = useLayoutViewController();

    let menuContent: ReactNode =
        <Grid sx={{
            padding: darkTheme.spacing(1),
        }}
              container
              justifyContent="space-between"
              alignItems="center">
            <Grid>
                <MenuIcon/>
            </Grid>
            <Grid>
                <SearchBar
                    sx={{
                        width: 400
                    }}
                    placeholder="Search Google Maps"
                    inputProps={{'aria-label': 'search google maps'}}
                />
            </Grid>
            <Grid>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    {viewController.isAuthenticated ?
                        <ProfileDrawer onLogOutClick={viewController.profileDrawerHooks.onLogOutClick}/>
                        :
                        <>
                            <SignInButton/>
                            <SignUpButton/>
                        </>
                    }
                </Stack>
            </Grid>
        </Grid>;
    return (
        <Stack>
            <Box component="header" sx={{
                position: "fixed",
                background: alpha(darkTheme.palette.background.default, 0.5),
                width: "100%",
                backdropFilter: "blur(8px)",
                zIndex: 1000
            }}>
                {menuContent}
                <Divider/>
            </Box>
            <Stack sx={{
                width: 1200,
                mt: darkTheme.spacing(5),
                mr: "auto",
                ml: "auto",
            }}>
                {properties.children}
            </Stack>
        </Stack>
    );
}
