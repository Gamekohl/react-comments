import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { Post } from '../models/Post.model';
import { getPosts } from '../services/posts';

const PostLists: FunctionComponent = () => {
    const { loading, error, value: posts } = useAsync(getPosts, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1 className='error-msg'>{error}</h1>
    }

    return (
        <>
            {posts.map((post: Post) => (
                <h1 key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h1>
            ))}
        </>
    )
}

export default PostLists