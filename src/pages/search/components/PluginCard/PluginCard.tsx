import React from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

export const PluginCard = () => {

    return (
        <Card>
            <CardMedia
                component="img"
                height="194"
                image="https://source.unsplash.com/random?wallpapers"
                alt="Paella dish"
            />
            <CardContent>
                <Typography>Пример текста</Typography>
            </CardContent>
            <CardActions>
                <Button>Посмотреть</Button>
                <Button>Купить</Button>
            </CardActions>
        </Card>
    );
};

