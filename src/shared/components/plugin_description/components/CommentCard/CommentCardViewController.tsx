import {FeedbackDto} from "src/api/generated";

export type CommentCardViewController = {
    feedback: FeedbackDto,
    avatarLabel: string,
}

export type CommentCardProps = {
    feedback: FeedbackDto,
}

const useCommentCardViewController: (props: CommentCardProps) => CommentCardViewController = (props) => {
    console.log('useCommentCardViewController')
    return {
        feedback: props.feedback,
        avatarLabel: props.feedback.user.login[0],
    } as CommentCardViewController;
}

export default useCommentCardViewController;