import {Box, Button, Rating, Stack, Typography} from "@mui/material";
import React from "react";
import useCommentsBoxViewController, {
    CommentsBoxProps
} from "src/shared/components/plugin_description/components/CommentsBox/CommentsBoxViewController";
import {CommentCard} from "src/shared/components/plugin_description/components/CommentCard/CommentCard";
import TextField from "@mui/material/TextField";

export function CommentsBox(props: CommentsBoxProps) {
    const viewController = useCommentsBoxViewController(props);
    return (
        <Stack direction="column"
               spacing={1}
        >
            <Typography>FEEDBACKS</Typography>
            <Box component="form"
                 onSubmit={viewController.onSubmitFeedback}
                 hidden={viewController.isHiddenForm}
            >
                <Rating
                    name="simple-controlled"
                    value={viewController.ratingValue}
                    onChange={viewController.onRatingChange}
                />
                <TextField multiline
                           value={viewController.commentValue}
                           onChange={viewController.onCommentChange}
                />
                <Button type='submit' variant='contained'>SUBMIT</Button>
            </Box>
            <Stack spacing={1} direction="column">
                {viewController.commentsProps.map(prop => {
                    return <CommentCard {...prop} key={prop.feedback.id}/>
                })}
            </Stack>
        </Stack>
    )
}