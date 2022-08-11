import React, { useState } from 'react'
import IconButton from './IconButton'
import { FaEdit, FaHeart, FaReply, FaTrash } from 'react-icons/fa';
import { usePost } from '../contexts/PostContext';
import CommentList from './CommentList';

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })

const Comment = ({ id, message, user, createdAt }) => {
    const [childsHidden, setChildsHidden] = useState(false);
    const { getReplies } = usePost();
    const childComments = getReplies(id);

    return (
        <>
            <div className='comment'>
                <div className='header'>
                    <span className='name'>{user.name}</span>
                    <span className='date'>{dateFormatter.format(Date.parse(createdAt))}</span>
                </div>
                <div className='message'>
                    {message}
                </div>
                <div className='footer'>
                    <IconButton Icon={FaHeart}>
                        2
                    </IconButton>
                    <IconButton Icon={FaReply} />
                    <IconButton Icon={FaEdit} />
                    <IconButton Icon={FaTrash} color='danger' />
                </div>
            </div>
            {childComments?.length > 0 && (
                <>
                    <div className={`nested-comments-stack ${childsHidden ? 'hide' : ''}`}>
                        <button className='collapse-line' onClick={() => setChildsHidden(true)} />
                        <div className='nested-comments'>
                            <CommentList comments={childComments} />
                        </div>
                    </div>
                    <button className={`btn mt-1 ${!childsHidden ? 'hide' : ''}`} onClick={() => setChildsHidden(false)}>Show replies</button>
                </>
            )}
        </>
    )
}

export default Comment