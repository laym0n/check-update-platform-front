import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import useAccessTokenDialogViewController, {
    AccessTokenDialogProps
} from "src/shared/components/access_token_dialog/AccessTokenDialogViewController";

export function AccessTokenDialog(props: AccessTokenDialogProps) {
    let viewController = useAccessTokenDialogViewController(props)

    return (
        <Dialog
            open={viewController.isOpenDialog}
            onClose={viewController.handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" textAlign="center">
                {"CREATED PLUGIN"}
            </DialogTitle>
            <DialogContent>
                <Typography>{`Use token ${props.accessToken} for access platform from token`}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={viewController.handleCloseDialog}
                        autoFocus
                        variant="contained">
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    );
}
