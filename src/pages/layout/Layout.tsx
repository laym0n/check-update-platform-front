import React, {ReactNode} from "react";
import {SignInButton, SignUpButton} from "src/pages/layout/components/SignInUpButtons";
import {ProfileDrawer} from "src/pages/layout/components/ProfileDrawer";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {darkTheme} from "src/shared/theme"
import Grid from "@mui/material/Grid";
import {alpha} from '@mui/system';
import useLayoutViewController from "src/pages/layout/LayoutViewController";
import {LayoutContextProvider} from "src/pages/layout/LayoutContext";
import Link from "@mui/material/Link";

type LayoutProperties = {
    children: ReactNode;
}

export function Layout(props: LayoutProperties) {
    return (
        <LayoutContextProvider>
            <LayoutContent {...props}/>
        </LayoutContextProvider>
    );
}

function LayoutContent(properties: LayoutProperties) {
    let viewController = useLayoutViewController();
    console.log('Layout render')
    let menuContent: ReactNode =
        <Grid sx={{
            padding: darkTheme.spacing(1),
        }}
              container
              justifyContent="space-between"
              alignItems="center">
            <Grid sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 1,
            }}>
                <Link href='/' height={25} width={25}>
                    <img src="/logo.svg" alt="logo"/>
                </Link>
            </Grid>
            <Grid>
                <Typography>
                    <Link href="/" underline="none">
                        WEBRESOURCE OBSERVER
                    </Link>
                </Typography>
            </Grid>
            <Grid paddingRight={1}>
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
                width: '100%',
                maxWidth: 1655,
                padding: 1,
                mt: darkTheme.spacing(7),
                mr: "auto",
                ml: "auto",
            }}>
                {properties.children}
            </Stack>
        </Stack>
    );
}
