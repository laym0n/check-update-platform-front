import {Card, Rating, Stack, Typography} from "@mui/material";
import React from "react";
import useCommentCardViewController, {
    CommentCardProps
} from "src/shared/components/plugin_description/components/CommentCard/CommentCardViewController";
import Avatar from "@mui/material/Avatar";

export function CommentCard(props: CommentCardProps) {
    const viewController = useCommentCardViewController(props);
    return (
        <Card sx={{padding: 2}}>
            <Stack direction="row" alignContent="center" alignItems="center" spacing={2}>
                <Avatar>{viewController.avatarLabel}</Avatar>
                <Stack direction="column" alignContent="flex-start" alignItems="flex-start" spacing={2}>
                    <Rating readOnly value={viewController.feedback.rating}/>
                    <Typography>{viewController.feedback.comment}</Typography>
                </Stack>
            </Stack>
        </Card>
    )
}