export interface Comment {
    id: string;
    postId: string;
    message: string;
    parentId: string;
    likeCount: number;
    likedByMe: boolean;
    user: any;
    createdAt: string;
}