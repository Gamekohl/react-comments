import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../services/posts";

const Context = createContext();

export const usePost = () => {
    return useContext(Context);
}

export const PostProvider = ({ children }) => {
    const { id } = useParams();
    const { loading, error, value: post } = useAsync(() => getPost(id), [id]);
    const [comments, setComments] = useState([]);
    const commentsByParentId = useMemo(() => {
        if (comments == null) {
            return [];
        }

        const group = {}

        comments.forEach(comment => {
            group[comment.parentId] ||= [];
            group[comment.parentId].push(comment);
        });

        return group;
    }, [comments]);

    useEffect(() => {
        if (post?.comments == null)
            return;

        setComments(post.comments);
    }, [post?.comments]);

    const getReplies = (id) => {
        return commentsByParentId[id];
    }

    const createLocalComment = (comment) => {
        setComments(prev => ([
            comment,
            ...prev
        ]));
    }

    return (
        <Context.Provider value={{
            post: { id, ...post },
            getReplies,
            rootComments: commentsByParentId[null],
            createLocalComment
        }}>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1 className="error-msg">{error}</h1>
            ) : (
                <>{children}</>
            )}
        </Context.Provider>
    )
}