import * as React from 'react';
import {Layout} from "src/pages/layout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useTaskCreateViewController from "src/pages/task_create/TaskCreateViewController";
import TextField from "@mui/material/TextField";
import TagsAutocomplete from "src/pages/task_create/components/TagsAutocomplete/TagsAutocomplete";
import DistributionMethodsField
    from "src/pages/task_create/components/DistributionMethodsField/DistributionMethodsField";


export default function TaskCreatePage() {
    return (
        <Layout>
            <TaskCreatePageContent/>
        </Layout>
    );
}

function TaskCreatePageContent() {
    let viewController = useTaskCreateViewController();

    return (
        <>
            <Box component="form" noValidate onSubmit={viewController.onClickCreate} sx={{mt: 3}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    defaultValue={viewController.description}
                    onChange={viewController.onChangeDescription}
                    name="description"
                    label="description"
                    id="description"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    defaultValue={viewController.logoPath}
                    onChange={viewController.onChangeLogoPath}
                    name="logoPath"
                    label="logoPath"
                    id="logoPath"
                />
                <TagsAutocomplete {...viewController.tagsAutocompleteProps}/>
                <DistributionMethodsField {...viewController.distributionMethodsField}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}>
                    Create
                </Button>
            </Box>
        </>
    );
}
