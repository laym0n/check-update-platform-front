import React, {ReactNode} from "react";
import {SignInButton, SignUpButton} from "src/components/SignInUpButtons";
import {ProfileDrawer} from "src/components/ProfileDrawer";
import {diContainer, TYPES} from "src/logic/Config"

import styles from "./styles.module.scss";
import {AuthenticationService} from "src/logic/Authentication";
import {Stack} from "@mui/material";

type LayoutProperties = {
    children: ReactNode;
}

export function Layout(properties: LayoutProperties) {
    let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
    let isAuthenticated = authenticationService.userAuthenticated();
    let menuContent: ReactNode;
    menuContent =
        <Stack sx={{margin:"25px"}} direction="row" justifyContent="flex-end" spacing={2}>
            {isAuthenticated ?
                <ProfileDrawer/>
                :
                <>
                    <SignInButton/>
                    <SignUpButton/>
                </>
            }
        </Stack>;
    return (
        <Stack className={styles.layoutPage}>
            {menuContent}
            {properties.children}
        </Stack>
    );
}
