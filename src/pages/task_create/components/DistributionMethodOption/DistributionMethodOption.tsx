import * as React from 'react';
import {Autocomplete, IconButton, Stack, Typography} from "@mui/material";
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
        <Stack display="flex" direction="row" spacing={1} justifyContent="flex-start">
            <Autocomplete
                sx={{
                    width: 300
                }}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Typography {...getTagProps({index})}>option.toString()</Typography>
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Type"
                        variant="outlined"
                        placeholder="Select type"
                    />
                )}
                getOptionLabel={(option) => option.toString()}
                options={[type.PURCHASE, type.SUBSCRIBE]}
                value={viewController.distributionMethod.type}
                onChange={viewController.onChangeType}
            />

            <TextField
                sx={{
                    width: 300
                }}
                label="Cost"
                type="number"
                value={viewController.distributionMethod.cost}
                onChange={viewController.onChangeCost}/>

            <Autocomplete
                sx={{
                    width: 300
                }}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Typography {...getTagProps({index})}>{option.label}</Typography>
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Duration"
                        placeholder="Select duration"
                    />
                )}
                getOptionLabel={(option) => option.label}
                options={viewController.durations}
                value={viewController.selectedDuration}
                onChange={viewController.onSelectedDuration}
                hidden={viewController.hiddenDuration}/>

            <TextField
                sx={{
                    width: 300,
                    display: viewController.hiddenDuration ? "none" : "block",
                }}
                type="number"
                label="Duration"
                value={viewController.durationNumber}
                onChange={viewController.onChangeDurationNumber}/>

            <IconButton onClick={viewController.onDeleteClick}>
                <DeleteIcon color="primary"/>
            </IconButton>
        </Stack>
    );
}
