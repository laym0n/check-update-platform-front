import React from "react";
import {Button, Dialog, DialogActions, DialogTitle, Stack} from "@mui/material";
import useAccessTokenDialogViewController, {
    AccessTokenDialogProps
} from "src/shared/components/make_decision_dialog/AccessTokenDialogViewController";
import TextField from "@mui/material/TextField";

export function MakeDecisionDialog(props: AccessTokenDialogProps) {
    let viewController = useAccessTokenDialogViewController(props)

    return (
        <Dialog
            open={viewController.isOpenDialog}
            onClose={viewController.handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" textAlign="center">
                {"MAKE DECISION"}
            </DialogTitle>
            <DialogActions>
                <Stack direction="column" spacing={1} width={600}>

                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        fullWidth
                        rows={4}
                        placeholder="Comment"
                        onChange={viewController.onCommentChange}/>
                    <Stack direction="row" width='100%' spacing={1}>
                        <Button onClick={viewController.onRejectClick}
                                color="error"
                                fullWidth
                                variant="contained">
                            REJECT
                        </Button>
                        <Button onClick={viewController.onApproveClick}
                                autoFocus
                                fullWidth
                                variant="contained"
                                color="success">
                            APPROVE
                        </Button>
                    </Stack>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}
