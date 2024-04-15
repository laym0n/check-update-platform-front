import React from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";

export type ProfileDrawerViewController = {
    open: boolean,
    onProfileButtonClick: React.MouseEventHandler<HTMLButtonElement>,
    onLogOutClick: React.MouseEventHandler<HTMLDivElement>,
    onCloseDrawer: (event: object, reason: string) => void,
}

export type ProfileDrawerHooks = {
    onLogOutClick: React.MouseEventHandler<HTMLDivElement>,
}

const useProfileDrawerViewController: (hooks: ProfileDrawerHooks) => ProfileDrawerViewController = (hooks: ProfileDrawerHooks) => {
    const [open, setOpen] = React.useState(false);
    console.log("useProfileDrawerViewController get")
    const onProfileButtonClick = () => {
        setOpen(!open);
    }

    const onLogOutClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        authenticationService.logOut();
        hooks.onLogOutClick(event)
    }

    const onCloseDrawer = (event: object, reason: string) => {
        setOpen(!open);
    };
    return {
        open: open,
        onProfileButtonClick: onProfileButtonClick,
        onCloseDrawer: onCloseDrawer,
        onLogOutClick: onLogOutClick
    };
};

export default useProfileDrawerViewController;

