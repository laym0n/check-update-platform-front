import * as React from 'react';
import {Autocomplete, IconButton, Typography} from "@mui/material";
import {DistributionMethodDto} from "src/api/generated";
import useDistributionMethodOptionViewController, {
    DistributionMethodOptionProps
} from "src/pages/task_create/components/DistributionMethodOption/DistributionMethodOptionViewController";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import type = DistributionMethodDto.type;


export default function DistributionMethodOption(props: DistributionMethodOptionProps) {
    let viewController = useDistributionMethodOptionViewController(props);

    return (
        <>
            <Autocomplete
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Typography {...getTagProps({index})}>option.toString()</Typography>
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Выберите теги"
                    />
                )}
                getOptionLabel={(option) => option.toString()}
                options={[type.PURCHASE, type.SUBSCRIBE]}
                value={viewController.distributionMethod.type}
                onChange={viewController.onChangeType}
            />

            <TextField
                type="number"
                value={viewController.distributionMethod.cost}
                onChange={viewController.onChangeCost}/>

            <IconButton onClick={viewController.onDeleteClick}>
                <DeleteIcon/>
            </IconButton>
        </>
    );
}
