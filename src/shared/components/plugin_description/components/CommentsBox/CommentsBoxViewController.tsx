import {CreateOrUpdateFeedbackRequestDto, FeedbackDto} from "src/api/generated";
import {CommentCardProps} from "src/shared/components/plugin_description/components/CommentCard";
import React, {useCallback, useEffect, useMemo, useState} from "react";

export type CommentsBoxViewController = {
    onSubmitFeedback: React.FormEventHandler<HTMLDivElement>;
    onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    commentValue: string;
    ratingValue: number;
    onRatingChange: (event: React.SyntheticEvent, value: (number | null)) => void;
    commentsProps: CommentCardProps[],
    isHiddenForm: boolean,
}

export type CommentsBoxProps = {
    initFeedback: FeedbackDto,
    feedbacks: FeedbackDto[],
    isHiddenForm: boolean,
    onSubmitComment?: (request: CreateOrUpdateFeedbackRequestDto) => void;
}

const useCommentsBoxViewController: (props: CommentsBoxProps) => CommentsBoxViewController = (props) => {
    console.log('useCommentsBoxViewController')
    const {onSubmitComment, feedbacks, initFeedback} = {...props}

    const [ratingValue, setRatingValue] = useState(initFeedback?.rating || 5)
    const [commentValue, setCommentValue] = useState(initFeedback?.comment || '')

    useEffect(() => {
        setRatingValue(initFeedback?.rating || 5)
        setCommentValue(initFeedback?.comment || '')
    }, [initFeedback?.comment, initFeedback?.rating]);

    const commentProps: CommentCardProps[] = useMemo(() => {
        return feedbacks
            .map(feedback => {
                return {
                    feedback: feedback,
                }
            })
    }, [feedbacks]);

    const onRatingChange: (event: React.SyntheticEvent, value: number) => void = useCallback((event, value) => {
        setRatingValue(value)
    }, []);
    const onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        setCommentValue(event.target.value)
    }, []);
    const onSubmitFeedback: React.FormEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault()
        if (onSubmitComment) {
            onSubmitComment({
                comment: commentValue,
                rating: ratingValue,
                pluginId: ''
            })
        }
    }, [commentValue, onSubmitComment, ratingValue]);

    return {
        ratingValue: ratingValue,
        commentsProps: commentProps,
        onRatingChange: onRatingChange,
        onCommentChange: onCommentChange,
        onSubmitFeedback: onSubmitFeedback,
        isHiddenForm: props.isHiddenForm,
    } as CommentsBoxViewController;
}

export default useCommentsBoxViewController;