export interface Post {
    id: number;
    title: string;
    anons: string;
    fullText: string;
    lastChange: Date;
    status: string;
    authorId: number;
    categoryId: number;
    authorNickname: string;
    categoryName: string;
    likes: number;
    dislikes: number;
    commentsNumber: number;
}

