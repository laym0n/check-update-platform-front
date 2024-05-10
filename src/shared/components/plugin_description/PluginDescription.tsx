import React from "react";
import {Box, Chip, ImageList, ImageListItem, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import usePluginDescriptionViewController, {
    PluginDescriptionProps
} from "src/shared/components/plugin_description/PluginDescriptionViewController";
import {
    DistributionMethodAutocomplete
} from "src/shared/components/DistributionMethodAutocomplete/DistributionMethodAutocomplete";
import {BuyButton} from "src/shared/components/BuyButton/BuyButton";
import {CommentsBox} from "src/shared/components/plugin_description/components/CommentsBox/CommentsBox";

export function PluginDescription(props: PluginDescriptionProps) {
    let viewController = usePluginDescriptionViewController(props)

    const simpleImageStyle: React.CSSProperties = {
        width: `${100 / (viewController.imagePaths?.length || 1)}%`,
        maxWidth: 100,
        height: 'auto',
    };
    const selectedImageStyle: React.CSSProperties = {
        ...simpleImageStyle,
        borderStyle: 'solid',
        borderRadius: '8px',
        borderColor: 'primary'
    };
    return (
        <Stack width='100%' spacing={1}>
            <Grid container>
                <Grid item
                      xs={6}
                      sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column'
                      }}>
                    <Box alignItems="center"
                           sx={{
                               display: 'flex',
                               flexDirection: 'column',
                               width: 600,
                               height: 700
                           }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            height: 500,
                            width: 500,
                            maxHeight: 500,
                        }}>
                            <img
                            src={viewController.imagePaths?.[viewController.selectedIndexImage]}
                            alt={viewController.imagePaths?.[viewController.selectedIndexImage]}
                            style={{
                                width: '100%',
                            }}
                            />
                        </div>
                        <ImageList variant="quilted"
                                   cols={viewController.imagePaths?.length}
                                   sx={{width: "auto", display: "flex"}}>
                            {(viewController.imagePaths || []).map((imageUrl, index) => (
                                <ImageListItem key={index}
                                               sx={{
                                                   ...(index === viewController.selectedIndexImage ? selectedImageStyle : simpleImageStyle),
                                                   objectFit: 'cover'
                                               }}
                                               onClick={(event) => viewController.onImageClick(event, index)}>
                                    <img
                                        src={imageUrl}
                                        alt={imageUrl}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Stack alignItems="center" justifyContent="center" height="100%">
                        <Stack alignItems="center">
                            <Avatar alt="logo"
                                    src={viewController.logoPath}
                                    sx={{
                                        ...simpleImageStyle,
                                        width: 300,
                                        aspectRatio: '1 / 1'
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

            {(viewController.description || '').split('\\n').map((desc, index) => {
                return (<Typography key={index}
                                    variant="body1">
                    {desc}
                </Typography>)
            })}
            <CommentsBox {...viewController.commentsBoxProps}/>
        </Stack>
    );
}
