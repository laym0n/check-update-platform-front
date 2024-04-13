import React from "react";

import {Button, Typography} from "@mui/material";

import classNames from "classnames";

import styles from "./styles.module.scss";

type NavigateButtonProps = {
    text: string;
    isActiveSwitcher?: boolean;
    isSwitcher?: boolean;
    isMain?: boolean;
    onClick?: () => void;
};

export const NavigateButton: React.FC<NavigateButtonProps> = ({
                                                                  text,
                                                                  isActiveSwitcher,
                                                                  isSwitcher,
                                                                  isMain,
                                                                  onClick,
                                                              }) => {
    const isDefault = !isSwitcher && !isMain && !isActiveSwitcher;
    return (
        <Button
            className={classNames({
                [styles["activeSwitcher"]]: isActiveSwitcher,
                [styles["switcher"]]: isSwitcher,
                [styles["default"]]: isDefault,
                [styles["main"]]: isMain,
            })}
            variant="outlined"
            onClick={onClick}
        >
            <Typography
                className={classNames({
                    [styles["default-menu-button-text"]]:
                    !isSwitcher && !isActiveSwitcher,
                    [styles["switcher-menu-button-text"]]: isSwitcher || isActiveSwitcher,
                })}
            >
                {text}
            </Typography>
        </Button>
    );
};