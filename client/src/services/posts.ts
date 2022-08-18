import { Post } from "../models/Post.model";
import { makeRequest } from "./makeRequest"

export const getPosts = (): Promise<Post[]> => {
    return makeRequest('/posts');
}

export const getPost = (id: string): Promise<Post> => {
    return makeRequest(`/posts/${id}`);
}