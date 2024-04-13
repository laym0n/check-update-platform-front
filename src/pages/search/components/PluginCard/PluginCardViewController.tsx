import React, {MouseEventHandler} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";

export type PluginCardViewController = {
    open: boolean,
    onProfileButtonClick: (event: MouseEventHandler<HTMLAnchorElement>) => void,
    onLogOutClick: (event: MouseEventHandler<HTMLAnchorElement>) => void,
    onCloseDrawer: (event: object, reason: string) => void,
}

export type PluginCardHooks = {
    onLogOutClick: (event: MouseEventHandler<HTMLAnchorElement>) => void,
}

const usePluginCard: (hooks: PluginCardHooks) => PluginCardViewController = (hooks: PluginCardHooks) => {
    const [open, setOpen] = React.useState(false);

    const onProfileButtonClick = () => {
        setOpen(!open);
    }

    const onLogOutClick = (event: MouseEventHandler<HTMLAnchorElement>) => {
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

export default usePluginCard;

