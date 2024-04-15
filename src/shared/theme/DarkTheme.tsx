import {createTheme} from '@mui/material/styles';
import {grey, yellow} from '@mui/material/colors';
import {alpha} from "@mui/system";

export const darkTheme = createTheme({
    palette: {
        primary: yellow,
        background: {
            default: "#101418",
            paper: "#31363F"
        },
        divider: "#6F7F95",
        text: {
            primary: "#fff",
            secondary: "#6F7F95",
        },
        action: {
            disabled: grey[500],
            disabledBackground: alpha("#fff", 0.1)
        }
    }
})
