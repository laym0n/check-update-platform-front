import React from "react";
import {Link} from "react-router-dom";

import {NavigateButton} from "src/components/NavigateButton";

export const SignInButton = () => {
    return (
        <Link to="/sign-in">
            <NavigateButton text={"SignInButton"} isMain/>
        </Link>
    );
};

