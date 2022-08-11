import React from 'react'
import Comment from './Comment'

const CommentList = ({ comments }) => {
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