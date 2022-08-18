import React from 'react'
import { FunctionComponent } from 'react';
import { usePost } from '../contexts/PostContext'
import { useAsyncFn } from '../hooks/useAsync';
import { createComment } from '../services/comments';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Post: FunctionComponent = () => {
    const { post, rootComments, createLocalComment } = usePost();
    const { loading, error, exec: createCommentFn } = useAsyncFn(createComment)

    const onCommentCreate = (message: string) => {
        return createCommentFn({ postId: post.id, message })
            .then(createLocalComment);
    }

    return (
        <>
            <h1>{post.title}</h1>
            <article>
                {post.body}
            </article>
            <h3 className='comments-title'>Comments</h3>
            <section>
                <CommentForm loading={loading} error={error} onSubmit={onCommentCreate} />
                {rootComments !== null && rootComments?.length > 0 && (
                    <div className='mt-4'>
                        <CommentList comments={rootComments} />
                    </div>
                )}
            </section>
        </>
    )
}

export default Post