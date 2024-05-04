import * as React from 'react';
import {Layout} from "src/pages/layout";
import Button from "@mui/material/Button";
import useTaskCreateViewController from "src/pages/task_create/TaskCreateViewController";
import TagsAutocomplete from "src/pages/task_create/components/TagsAutocomplete/TagsAutocomplete";
import DistributionMethodsField
    from "src/pages/task_create/components/DistributionMethodsField/DistributionMethodsField";
import TextFieldWithInit from "src/pages/task_create/components/TextFieldWithInit/TextFieldWithInit";
import {Stack} from "@mui/material";


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
            <Stack component="form"
                   noValidate
                   onSubmit={viewController.onClickCreate}
                   sx={{mt: 3}}
                   spacing={1}>
                <TextFieldWithInit {...viewController.propsForDescription}/>
                <TextFieldWithInit {...viewController.propsForLogoPath}/>
                <TagsAutocomplete {...viewController.tagsAutocompleteProps}/>
                <DistributionMethodsField {...viewController.distributionMethodsField}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}>
                    Create
                </Button>
            </Stack>
        </>
    );
}
