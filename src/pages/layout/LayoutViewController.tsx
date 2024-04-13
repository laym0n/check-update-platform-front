import {MouseEventHandler, ReactNode, useState} from "react";
import {ProfileDrawerHooks} from "src/components/ProfileDrawer";
import {diContainer, TYPES} from "src/logic/Config"
import {AuthenticationService} from "src/logic/services/Authentication";

export type LayoutViewController = {
    isAuthenticated: boolean,
    profileDrawerHooks: ProfileDrawerHooks
}

const useLayoutViewController: () => LayoutViewController = () => {
    let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
    let isAuthenticatedUser = authenticationService.userAuthenticated();
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedUser)
    let menuContent: ReactNode;

    const onLogOutClick = (event: MouseEventHandler<HTMLAnchorElement>) => {
        let isAuthenticatedUser = authenticationService.userAuthenticated();
        setIsAuthenticated(isAuthenticatedUser);
    }
    let profileDrawerHooks: ProfileDrawerHooks = {
        onLogOutClick: onLogOutClick
    }
    return {
        profileDrawerHooks: profileDrawerHooks,
        isAuthenticated: isAuthenticated
    };
}

export default useLayoutViewController;
