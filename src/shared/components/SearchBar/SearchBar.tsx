import {darkTheme} from "src/shared/theme";
import styled from "@emotion/styled";
import {Box, IconButton, InputBase, InputBaseProps} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarTextField = styled(InputBase)<InputBaseProps>(({theme}) => ({
    m: "0 auto",
    '& .MuiInputBase-input': {
        color: darkTheme.palette.getContrastText(darkTheme.palette.background.default),
        backgroundColor: darkTheme.palette.background.default
    }
}));

export type SearchBarProps = {
    width: any;
    placeholder: string;
    searchValue: string;
    onSearchValueChange: ((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void);
    onSubmit: React.FormEventHandler<HTMLDivElement>;

};

export function SearchBar(props: SearchBarProps) {
    return (
        <Box component="form" onSubmit={props.onSubmit} width={props.width}>
            <SearchBarTextField defaultValue={props.searchValue}
                                placeholder={props.placeholder}
                                aria-label={props.placeholder}
                                onChange={props.onSearchValueChange}/>
            <IconButton type="submit" aria-label="search">
                <SearchIcon color="primary"/>
            </IconButton>
        </Box>
    )
}
