import {useNavigate} from "react-router-dom";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import {useEffect} from "react";

const useNavigateOnLogOut: (endpoint: string) => void = (endpoint) => {
    const navigate = useNavigate();
    const layoutContext = useLayoutContext();
    useEffect(() => {
        if (layoutContext.isAuthenticated) {
            return;
        }
        navigate(endpoint)
    }, [endpoint, layoutContext.isAuthenticated, navigate])
}

export default useNavigateOnLogOut;