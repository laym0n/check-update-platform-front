import React from "react";

import {NavigateButton} from "src/components/NavigateButton";
import {Link} from "react-router-dom";

export const SignUpButton = () => {
    return (
        <Link to={"/sign-up"}>
            <NavigateButton text={"SignUpPage"}/>
        </Link>);
};
