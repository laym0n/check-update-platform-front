import React, {useCallback} from "react";
import {ProfileDrawerHooks} from "src/pages/layout/components/ProfileDrawer";
import {diContainer, TYPES} from "src/logic/Config"
import {AuthenticationService} from "src/logic/services/Authentication";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import useNavigateOnLogOut from "src/shared/hooks/useNavigateOnLogOut";

export type LayoutViewController = {
    isAuthenticated: boolean,
    profileDrawerHooks: ProfileDrawerHooks
}

const useLayoutViewController: () => LayoutViewController = () => {
    const layoutContext = useLayoutContext();
    useNavigateOnLogOut('/');

    const onLogOutClick: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
        let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        authenticationService.logOut();
        layoutContext.setIsAuthenticated(curValue => !curValue);
    }, [layoutContext])
    let profileDrawerHooks: ProfileDrawerHooks = {
        onLogOutClick: onLogOutClick
    }
    return {
        profileDrawerHooks: profileDrawerHooks,
        isAuthenticated: layoutContext.isAuthenticated,
    };
}

export default useLayoutViewController;
