import React from "react";
import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import usePluginCardController, {
    PluginCardProps
} from "src/pages/search/components/PluginCard/PluginCardViewController";
import TextField from "@mui/material/TextField";


export const PluginCard = (props: PluginCardProps) => {
    let viewController = usePluginCardController(props);
    console.log("PluginCard render")
    return (
        <Card sx={{margin: 2, width: 300}}>
            <CardMedia
                component="img"
                height="194"
                image={viewController.pluginInfo.description.logoPath}
                alt="Paella dish"
            />
            <CardContent>
                <Typography>{viewController.pluginInfo.name}</Typography>
            </CardContent>
            <Stack>
                <Autocomplete
                    onChange={viewController.onChangeDistributionMethod}
                    disablePortal
                    options={viewController.distributionMethodAutocompleteDtoArray!}
                    value={viewController.distributionMethodAutocompleteDtoArray![0]}
                    sx={{width: 300}}
                    autoSelect
                    renderInput={(params) => <TextField {...params} label="Movie"/>}
                />
                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button sx={{width: '48%'}} onClick={viewController.onViewButtonClick}
                            variant="contained">Посмотреть</Button>
                    <Tooltip title={viewController.buyButtonToolTipTitle} arrow>
                        <span style={{width: '48%'}}>
                            <Button sx={{width: '100%'}}
                                    onClick={viewController.onBuyButtonClick}
                                    variant="contained"
                                    disabled={viewController.disableBuyButton}>Купить</Button>
                        </span>
                    </Tooltip>
                </CardActions>
            </Stack>
        </Card>
    );
};

