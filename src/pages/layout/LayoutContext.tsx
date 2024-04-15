import {createContext, ReactNode, useContext, useMemo, useState} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {AuthenticationService} from "src/logic/services/Authentication";

type LayoutContext = {
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
}

const defaultLayoutContextType: LayoutContext = {
    isAuthenticated: false,
    setIsAuthenticated: () => {
    }
};

let Context = createContext<LayoutContext>(defaultLayoutContextType);

export function useLayoutContext() {
    return useContext(Context);
}

export function LayoutContextProvider(props: LayoutContextProviderProps) {
    let authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
    let isAuthenticatedUser = authenticationService.userAuthenticated();
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedUser)
    console.log('LayoutContextProvider render')
    const initialState: LayoutContext = useMemo<LayoutContext>(() => {
        return {
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
        }
    }, [isAuthenticated])
    return (
        <Context.Provider value={initialState}>
            {props.children}
        </Context.Provider>
    );
}

type LayoutContextProviderProps = {
    children?: ReactNode
}
