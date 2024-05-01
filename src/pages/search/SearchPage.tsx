import React from "react";

import {SearchBar} from "src/shared/components/SearchBar";
import {Autocomplete, Button, Chip, Paper, Stack, Typography} from "@mui/material";
import {PluginCard} from "src/pages/search/components";
import useSearchViewController from "src/pages/search/SearchViewController";
import {Layout} from "src/pages/layout";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

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
                placeholder="Search plugins"
                searchValue={viewController.searchValue}
                onSubmit={viewController.onSearchValueSubmit}
                onSearchValueChange={viewController.onSearchValueChange}
            />
            <Grid container columns={36}>
                <Grid item md={7}>
                    <Paper elevation={24} sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                        <Typography variant="h6"
                                    gutterBottom
                                    margin={2}>
                            FILTERS
                        </Typography>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            fullWidth
                            options={viewController.tags}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Выберите теги"
                                />
                            )}
                            defaultValue={viewController.selectedTags}
                            onChange={viewController.onTagAutocompleteChange}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={option}
                                        {...getTagProps({index})}
                                    />
                                ))
                            }
                        />
                        <Button sx={{
                            margin: 1,
                        }}
                                onClick={viewController.onApplyFiltersClick}>
                            APPLY
                        </Button>
                    </Paper>
                </Grid>
                <Grid item md={22}>
                    <Stack direction="row" justifyContent="center" sx={{
                        flexWrap: "wrap"
                    }}>
                        {viewController.pluginCardProps.map(prop => {
                            return <PluginCard {...prop}/>
                        })}
                    </Stack>
                </Grid>
                <Grid item md={7}/>
            </Grid>
        </Stack>
    );
}
