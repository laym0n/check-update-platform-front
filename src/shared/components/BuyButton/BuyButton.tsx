import {Button, Tooltip} from "@mui/material";
import React from "react";
import useBuyButtonViewController, {BuyButtonProps} from "src/shared/components/BuyButton/BuyButtonViewController";

export function BuyButton(props: BuyButtonProps) {
    const viewController = useBuyButtonViewController(props);
    return (
        <Tooltip title={viewController.buyButtonToolTipTitle}
                 arrow>
                        <span style={{width: viewController.width}}>
                            <Button sx={{width: '100%'}}
                                    onClick={viewController.onBuyButtonClick}
                                    variant="contained"
                                    disabled={viewController.disableBuyButton}>BUY</Button>
                        </span>
        </Tooltip>
    )
}