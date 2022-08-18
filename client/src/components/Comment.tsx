import React, { FunctionComponent, useState } from 'react'
import IconButton from './IconButton'
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from 'react-icons/fa';
import { usePost } from '../contexts/PostContext';
import CommentList from './CommentList';
import { useAsyncFn } from '../hooks/useAsync';
import { createComment, deleteComment, toggleCommentLike, updateComment } from '../services/comments';
import CommentForm from './CommentForm';
import useUser from '../hooks/useUser';
import { Comment as CommentModel } from '../models/Comment.model';

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })

type CommentProps = CommentModel;

const Comment: FunctionComponent<CommentProps> = ({ id, message, user, createdAt, likeCount, likedByMe }) => {
    const [childsHidden, setChildsHidden] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const {
        post,
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike
    } = usePost();
    const createCommentFn = useAsyncFn(createComment);
    const updateCommentFn = useAsyncFn(updateComment);
    const deleteCommentFn = useAsyncFn(deleteComment);
    const toggleCommentLikeFn = useAsyncFn(toggleCommentLike);
    const childComments = getReplies(id);
    const currentUser = useUser();

    const handleReplying = () => {
        setIsReplying(prev => !prev);
    }

    const handleEditing = () => {
        setIsEditing(prev => !prev);
    }

    const onCommentReply = (message: string) => {
        return createCommentFn.exec({ postId: post.id, message, parentId: id })
            .then((comment: Comment) => {
                setIsReplying(false);
                createLocalComment(comment);
            });
    }

    const onCommentUpdate = (message: string) => {
        return updateCommentFn.exec({ postId: post.id, message, id })
            .then((comment: CommentModel) => {
                setIsEditing(false);
                updateLocalComment(id, comment.message);
            });
    }

    const onCommentDelete = () => {
        return deleteCommentFn.exec({ postId: post.id, id })
            .then(({ commentId }: { commentId: string }) => {
                deleteLocalComment(commentId);
            });
    }

    const onToggleCommentLike = () => {
        return toggleCommentLikeFn.exec({ id, postId: post.id })
            .then(({ addLike }: { addLike: boolean }) => toggleLocalCommentLike(id, addLike));
    }

    return (
        <>
            <div className='comment'>
                <div className='header'>
                    <span className='name'>{user.name}</span>
                    <span className='date'>{dateFormatter.format(Date.parse(createdAt))}</span>
                </div>
                {isEditing ? (
                    <CommentForm autoFocus initialValue={message} onSubmit={onCommentUpdate} loading={updateCommentFn.loading} error={updateCommentFn.error} />
                ) : (
                    <div className='message'>
                        {message}
                    </div>
                )}
                <div className='footer'>
                    <IconButton onClick={onToggleCommentLike} disabled={toggleCommentLikeFn.loading} Icon={likedByMe ? FaHeart : FaRegHeart} aria-label={likedByMe ? "Unlike" : "Like"}>{likeCount}</IconButton>
                    <IconButton onClick={handleReplying} isActive={isReplying} Icon={FaReply} aria-label={isReplying ? "Cancel Replay" : "Reply"} />
                    {user.id === currentUser.id && (
                        <>
                            <IconButton onClick={handleEditing} isActive={isEditing} Icon={FaEdit} aria-label={isReplying ? "Cancel Editing" : "Edit"} />
                            <IconButton onClick={onCommentDelete} disabled={deleteCommentFn.loading} Icon={FaTrash} color='danger' />
                        </>
                    )}
                </div>
                {deleteCommentFn.error && (
                    <div className="error-msg mt-1">
                        {deleteCommentFn.error}
                    </div>
                )}
            </div>
            {
                isReplying && (
                    <div className="mt-1 ml-3">
                        <CommentForm autoFocus onSubmit={onCommentReply} loading={createCommentFn.loading} error={createCommentFn.error} />
                    </div>
                )
            }
            {
                childComments?.length > 0 && (
                    <>
                        <div className={`nested-comments-stack ${childsHidden ? 'hide' : ''}`}>
                            <button className='collapse-line' onClick={() => setChildsHidden(true)} />
                            <div className='nested-comments'>
                                <CommentList comments={childComments} />
                            </div>
                        </div>
                        <button className={`btn mt-1 ${!childsHidden ? 'hide' : ''}`} onClick={() => setChildsHidden(false)}>Show replies</button>
                    </>
                )
            }
        </>
    )
}

export default Comment