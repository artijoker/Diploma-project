export interface Comment {
    id: number;
    text: string;
    created: Date;
    accountId: number;
    postId: number;
    accountNickname: string;
    postTitle: string;
    isDeleted: boolean;
}

