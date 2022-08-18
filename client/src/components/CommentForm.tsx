import React, { FunctionComponent, useState } from 'react'
import { FormEvent } from 'react';

type CommentFormProps = {
    loading: boolean;
    error: any;
    onSubmit: (message: string) => Promise<any>;
    autoFocus?: boolean;
    initialValue?: string;
}

const CommentForm: FunctionComponent<CommentFormProps> = ({ loading, error, onSubmit, autoFocus = false, initialValue = '' }) => {
    const [message, setMessage] = useState(initialValue)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit(message)
            .then(() => setMessage(''));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="comment-form-row">
                    <textarea autoFocus={autoFocus} value={message} onChange={e => setMessage(e.target.value)} className='message-input' />
                    <button className='btn' type='submit' disabled={loading}>{loading ? 'Loading' : 'Post'}</button>
                </div>
                <div className='error-msg'>{error}</div>
            </form>
        </>
    )
}

export default CommentForm