import React, {ReactNode} from "react";
import {SignInButton, SignUpButton} from "src/components/SignInUpButtons";
import {ProfileDrawer} from "src/components/ProfileDrawer";
import {diContainer, TYPES} from "src/logic/Config"
import {AuthenticationService} from "src/logic/Authentication";
import {Box, Divider, Stack, TextField} from "@mui/material";
import {darkTheme} from "src/components/styles/theme"

type LayoutProperties = {
    children: ReactNode;
}

export function Layout(properties: LayoutProperties) {
    let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
    let isAuthenticated = authenticationService.userAuthenticated();
    let menuContent: ReactNode;

    menuContent =
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: darkTheme.spacing(1),
            borderRadius: darkTheme.shape.borderRadius,
            justifyContent: "center",
            // border: `1px solid ${darkTheme.palette.divider}`,
        }}>
            <TextField
                sx={{
                    m: "0 auto",
                    width: 400,
                    '& .MuiInputBase-input': {
                        color: darkTheme.palette.getContrastText(darkTheme.palette.background.default),
                        backgroundColor: darkTheme.palette.background.default
                    }
                }}
                variant="outlined"
                placeholder="Search Google Maps"
                inputProps={{'aria-label': 'search google maps'}}
            />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                {isAuthenticated ?
                    <ProfileDrawer/>
                    :
                    <>
                        <SignInButton/>
                        <SignUpButton/>
                    </>
                }
            </Stack>
        </Box>;
    return (
        <Stack>
            <Box component="header">
                {menuContent}
            </Box>
            <Divider/>
            {properties.children}
        </Stack>
    );
}
