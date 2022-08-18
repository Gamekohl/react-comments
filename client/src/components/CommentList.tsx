import React, { FunctionComponent } from 'react'
import { Comment as CommentModel } from '../models/Comment.model'
import Comment from './Comment'

type CommentListProps = {
    comments: CommentModel[]
};

const CommentList: FunctionComponent<CommentListProps> = ({ comments }) => {
    return (
        <>
            {comments.map(comment => (
                <div className='comment-stack' key={comment.id}>
                    <Comment {...comment} />
                </div>
            ))}
        </>
    )
}

export default CommentList