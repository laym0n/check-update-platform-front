import React from "react";

import {SearchBar} from "src/shared/components/SearchBar";
import {Stack} from "@mui/material";
import {PluginCard} from "src/pages/search/components";

export function SearchPage() {
    return (
        <Stack sx={{
            alignItems: "center"
        }}>
            <SearchBar
                sx={{
                    width: 400,
                }}
                placeholder="Search Google Maps"
                inputProps={{'aria-label': 'search google maps'}}
            />
            <Stack direction="row">
                <PluginCard/>
            </Stack>
        </Stack>
    );
}
