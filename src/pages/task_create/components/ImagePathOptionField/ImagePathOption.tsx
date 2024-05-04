import * as React from 'react';
import TextField from "@mui/material/TextField";
import useImagePathOptionViewController, {
    ImagePathOptionProps
} from "src/pages/task_create/components/ImagePathOptionField/ImagePathOptionViewController";
import {IconButton, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


export default function ImagePathOption(props: ImagePathOptionProps) {
    let viewController = useImagePathOptionViewController(props);

    return (
        <Stack direction="row" spacing={1}>
            <TextField multiline
                       fullWidth
                       value={viewController.selectedPath}
                       onChange={viewController.onChangeSelectedPath}/>
            <IconButton onClick={viewController.onDeleteClick}>
                <DeleteIcon color="primary"/>
            </IconButton>
        </Stack>
    );
}
