import {createTheme} from '@mui/material/styles';
import {grey, yellow} from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        primary: yellow,
        background: {
            default: "#222222",
            paper: "#31363F"
        },
        divider: grey["400"]
    }
})
