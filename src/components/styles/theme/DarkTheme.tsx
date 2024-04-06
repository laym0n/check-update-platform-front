import {createTheme} from '@mui/material/styles';
import {yellow} from '@mui/material/colors';

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
            secondary: "#6F7F95"
        }
    }
})
