import {Card, Rating, Stack, Typography} from "@mui/material";
import React from "react";
import useCommentCardViewController, {
    CommentCardProps
} from "src/shared/components/plugin_description/components/CommentCard/CommentCardViewController";
import Avatar from "@mui/material/Avatar";

export function CommentCard(props: CommentCardProps) {
    const viewController = useCommentCardViewController(props);
    return (
        <Card>
            <Stack direction="row" alignContent="center" spacing={2}>
                <Avatar>{viewController.avatarLabel}</Avatar>
                <Stack direction="column" alignContent="flex-start">
                    <Rating readOnly value={viewController.feedback.rating}/>
                    <Typography>{viewController.feedback.comment}</Typography>
                </Stack>
            </Stack>
        </Card>
    )
}