import React from "react";

import {SearchBar} from "src/shared/components/SearchBar";
import {Stack} from "@mui/material";
import {PluginCard} from "src/pages/search/components";
import useSearchViewController from "src/pages/search/SearchViewController";
import {Layout} from "src/pages/layout";

export function SearchPage() {
    return (
        <Layout>
            <SearchPageContent/>
        </Layout>
    );
}

export function SearchPageContent() {
    let viewController = useSearchViewController();
    return (
        <Stack sx={{
            alignItems: "center",
            width: "100%"

        }}>
            <SearchBar
                width={400}
                placeholder="Search Google Maps"
                searchValue={viewController.searchValue}
                onSubmit={viewController.onSearchValueSubmit}
                onSearchValueChange={viewController.onSearchValueChange}
            />
            <Stack direction="row" justifyContent="center" sx={{
                flexWrap: "wrap"
            }}>
                {viewController.pluginCardProps.map(prop => {
                    return <PluginCard {...prop}/>
                })}
            </Stack>
        </Stack>
    );
}
