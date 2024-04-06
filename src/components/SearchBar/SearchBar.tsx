import InputBase, {InputBaseProps} from "@mui/material/InputBase";
import {darkTheme} from "src/components/styles/theme";
import styled from "@emotion/styled";

export const SearchBar = styled(InputBase)<InputBaseProps>(({theme}) => ({
    m: "0 auto",
    '& .MuiInputBase-input': {
        color: darkTheme.palette.getContrastText(darkTheme.palette.background.default),
        backgroundColor: darkTheme.palette.background.default
    }
}));
