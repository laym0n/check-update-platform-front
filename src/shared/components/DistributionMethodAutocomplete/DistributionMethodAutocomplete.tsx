import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import useDistributionMethodAutocompleteViewController, {
    DistributionMethodAutocompleteProps
} from "src/shared/components/DistributionMethodAutocomplete/DistributionMethodAutocompleteViewController";

export function DistributionMethodAutocomplete(props: DistributionMethodAutocompleteProps) {
    const viewController = useDistributionMethodAutocompleteViewController(props);
    return (
        <Autocomplete
            onChange={viewController.onChangeDistributionMethod}
            disablePortal
            options={viewController.distributionMethods}
            value={viewController.selectedValue}
            sx={{width: 300}}
            autoSelect
            renderInput={(params) => <TextField {...params} label="Distribution"/>}
        />
    )
}