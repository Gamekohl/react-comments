import { Comment } from "../models/Comment.model";
import { makeRequest } from "./makeRequest"

export const createComment = ({ postId, message, parentId }: Comment): Promise<Comment> => {
    return makeRequest(`/posts/${postId}/comments`, {
        method: 'POST',
        data: {
            message,
            parentId
        }
    });
}

export const updateComment = ({ postId, message, id }: Comment): Promise<Comment> => {
    return makeRequest(`/posts/${postId}/comments/${id}`, {
        method: 'PUT',
        data: {
            message
        }
    });
}

export const deleteComment = ({ postId, id }: Comment): Promise<Comment> => {
    return makeRequest(`/posts/${postId}/comments/${id}`, {
        method: 'DELETE'
    });
}

export const toggleCommentLike = ({ id, postId }: Comment): Promise<{ addLike: boolean }> => {
    return makeRequest(`/posts/${postId}/comments/${id}/toggleLike`, {
        method: 'POST'
    });
}