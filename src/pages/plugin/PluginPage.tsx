import React from "react";
import {Autocomplete, Button, Chip, ImageList, ImageListItem, Stack, Tooltip, Typography} from "@mui/material";
import {Layout} from "src/pages/layout";
import Grid from "@mui/material/Grid";
import usePluginViewController from "src/pages/plugin/PluginViewController";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";

export function PluginPage() {
    return (
        <Layout>
            <PluginPageContent/>
        </Layout>
    );
}

export function PluginPageContent() {
    let viewController = usePluginViewController()

    const simpleImageStyle: React.CSSProperties = {
        width: `${100 / (viewController.pluginInfo?.description.specificDescription?.imagePaths?.length || 1)}%`,
        maxWidth: 100,
        height: 'auto',
        aspectRatio: '1 / 1',
        objectFit: 'cover'
    };
    const selectedImageStyle: React.CSSProperties = {
        ...simpleImageStyle,
        borderStyle: 'solid',
        borderRadius: '8px',
        borderColor: 'primary'
    };
    return (
        <Stack>
            <Grid container spacing={3}>
                <Grid item
                      xs={6}
                      sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column'
                      }}>
                    <Stack alignItems="center"
                           sx={{
                               width: '65%',
                           }}>
                        <img
                            src={viewController.pluginInfo?.description.specificDescription?.imagePaths?.[viewController.selectedIndexImage]}
                            alt={viewController.pluginInfo?.description.specificDescription?.imagePaths?.[viewController.selectedIndexImage]}
                            style={{
                                ...simpleImageStyle,
                                width: '100%',
                                maxWidth: "max-content",
                            }}
                        />
                        <ImageList variant="quilted"
                                   cols={viewController.pluginInfo?.description.specificDescription?.imagePaths?.length}
                                   sx={{width: "auto", display: "flex"}}>
                            {(viewController.pluginInfo?.description.specificDescription?.imagePaths || []).map((imageUrl, index) => (
                                <ImageListItem key={index}
                                               sx={index === viewController.selectedIndexImage ? selectedImageStyle : simpleImageStyle}
                                               onClick={(event) => viewController.onImageClick(event, index)}>
                                    <img
                                        src={imageUrl}
                                        alt={imageUrl}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Stack>
                </Grid>
                <Grid item xs={6} padding={2}>
                    <Stack alignItems="center" justifyContent="center" height="100%">
                        <Stack alignItems="center">
                            <Avatar alt="logo"
                                    src={viewController.pluginInfo?.description.logoPath}
                                    sx={{
                                        ...simpleImageStyle,
                                        width: 300,
                                    }}/>
                            <Typography variant="h5" gutterBottom>
                                {viewController.pluginInfo?.name}
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Autocomplete
                                onChange={viewController.onChangeDistributionMethod}
                                disablePortal
                                options={viewController.distributionMethodAutocompleteDtoArray!}
                                value={viewController.distributionMethodAutocompleteDtoArray![0]}
                                sx={{width: 300}}
                                autoSelect
                                renderInput={(params) => <TextField {...params} label="Movie"/>}
                            />
                            <Tooltip title={viewController.buyButtonToolTipTitle} arrow>
                                <>
                                    <Button variant="contained"
                                            color="primary"
                                            style={{marginBottom: 10}}
                                            onClick={viewController.onBuyButtonClick}
                                            disabled={viewController.disableBuyButton}>
                                        Купить
                                    </Button>
                                </>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Stack margin={2} direction="row">
                {viewController.pluginInfo?.description.specificDescription?.tags?.map(tag => (
                    <Chip key={tag} label={tag} variant="outlined"/>
                ))}
            </Stack>
            <Typography margin={2}
                        variant="body1">
                {viewController.pluginInfo?.description.specificDescription?.description}
            </Typography>
        </Stack>
    );
}
