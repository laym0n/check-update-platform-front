import * as React from 'react';
import TextField from "@mui/material/TextField";
import {Autocomplete, Chip} from "@mui/material";
import useTagsAutocompleteViewController, {
    TagsAutocompleteProps
} from "src/pages/task_create/components/TagsAutocomplete/TagsAutocompleteViewController";


export default function TagsAutocomplete(props: TagsAutocompleteProps) {
    let viewController = useTagsAutocompleteViewController(props);

    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            fullWidth
            options={viewController.tags}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                return option.tag;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select tags"
                />
            )}
            freeSolo
            value={viewController.selectedTags}
            onChange={viewController.onTagAutocompleteChange}

            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        label={option.tag}
                        color={option.isNew ? "error" : "primary"}
                        {...getTagProps({index})}
                    />
                ))
            }
        />
    );
}
