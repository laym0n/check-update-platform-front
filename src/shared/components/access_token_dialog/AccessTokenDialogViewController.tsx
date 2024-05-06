import {useCallback} from "react";

export type AccessTokenDialogViewController = {
    handleCloseDialog: () => void;
    isOpenDialog: boolean;
}

export type AccessTokenDialogProps = {
    accessToken: string,
    isOpenDialog: boolean;
    onCloseClick: () => void;
}

const useAccessTokenDialogViewController: (props: AccessTokenDialogProps) => AccessTokenDialogViewController = (props) => {
    let {isOpenDialog, onCloseClick} = {...props};
    const handleCloseDialog = useCallback(() => {
        onCloseClick();
    }, [onCloseClick]);

    return {
        isOpenDialog: isOpenDialog,
        handleCloseDialog: handleCloseDialog,
    } as AccessTokenDialogViewController;
}

export default useAccessTokenDialogViewController;
