import React from "react";
import {Chip, ImageList, ImageListItem, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import usePluginDescriptionViewController, {
    PluginDescriptionProps
} from "src/shared/components/plugin_description/PluginDescriptionViewController";
import {
    DistributionMethodAutocomplete
} from "src/shared/components/DistributionMethodAutocomplete/DistributionMethodAutocomplete";
import {BuyButton} from "src/shared/components/BuyButton/BuyButton";

export function PluginDescription(props: PluginDescriptionProps) {
    let viewController = usePluginDescriptionViewController(props)

    const simpleImageStyle: React.CSSProperties = {
        width: `${100 / (viewController.imagePaths?.length || 1)}%`,
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
        <Stack width='100%'>
            <Grid container>
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
                            src={viewController.imagePaths?.[viewController.selectedIndexImage]}
                            alt={viewController.imagePaths?.[viewController.selectedIndexImage]}
                            style={{
                                ...simpleImageStyle,
                                width: '100%',
                                maxWidth: "max-content",
                            }}
                        />
                        <ImageList variant="quilted"
                                   cols={viewController.imagePaths?.length}
                                   sx={{width: "auto", display: "flex"}}>
                            {(viewController.imagePaths || []).map((imageUrl, index) => (
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
                <Grid item xs={6}>
                    <Stack alignItems="center" justifyContent="center" height="100%">
                        <Stack alignItems="center">
                            <Avatar alt="logo"
                                    src={viewController.logoPath}
                                    sx={{
                                        ...simpleImageStyle,
                                        width: 300,
                                    }}/>
                            <Typography variant="h5" gutterBottom>
                                {viewController.name}
                            </Typography>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <DistributionMethodAutocomplete {...viewController.distributionMethodAutocompleteProps}/>
                            <BuyButton {...viewController.buyButtonProps}/>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Stack margin={2} direction="row">
                {viewController.tags?.map(tag => (
                    <Chip key={tag.tag} label={tag.tag} variant="outlined"/>
                ))}
            </Stack>
            <Typography margin={2}
                        variant="body1">
                {viewController.description}
            </Typography>
        </Stack>
    );
}
