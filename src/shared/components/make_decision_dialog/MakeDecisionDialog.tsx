import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import useMakeDecisionDialogViewController, {
    MakeDecisionDialogProps
} from "src/shared/components/make_decision_dialog/MakeDecisionDialogViewController";
import TextField from "@mui/material/TextField";

export function MakeDecisionDialog(props: MakeDecisionDialogProps) {
    let viewController = useMakeDecisionDialogViewController(props)

    return (
        <Dialog
            open={viewController.isOpenDialog}
            onClose={viewController.handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <TextField
                    id="outlined-multiline-static"
                    label="Комментарий"
                    multiline
                    rows={4}
                    placeholder="Введите ваш комментарий здесь..."
                    onChange={viewController.onCommentChange}
                />
                <Button onClick={viewController.onRejectClick}
                        color="error">
                    REJECT
                </Button>
                <Button onClick={viewController.onApproveClick}
                        autoFocus
                        color="success">
                    APPROVE
                </Button>
            </DialogActions>
        </Dialog>
    );
}
