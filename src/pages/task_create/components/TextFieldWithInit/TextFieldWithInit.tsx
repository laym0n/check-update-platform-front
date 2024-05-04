import * as React from 'react';
import TextField from "@mui/material/TextField";
import useTextFieldWithInitViewController, {
    TextFieldWithInitProps
} from "src/pages/task_create/components/TextFieldWithInit/TextFieldWithInitViewController";


export default function TextFieldWithInit(props: TextFieldWithInitProps) {
    let viewController = useTextFieldWithInitViewController(props);

    return (
        <TextField
            required
            multiline
            fullWidth
            value={viewController.value}
            onChange={viewController.onChange}
            name={viewController.placeholder}
            label={viewController.placeholder}
            id={viewController.placeholder}
        />
    );
}
