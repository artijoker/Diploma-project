import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {Post} from '../../model/Post';
import {IResponse} from '../../responses/IResponse';
import {HttpHeader} from "../../httpHeader";

@Injectable({
    providedIn: 'root'
})

export class PostService {

    private route = "posts/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }

    getPostById(postId: number): Observable<IResponse<Post>> {
        return this._client.post<IResponse<Post>>(
            this._host + this.route + "post/get-by-id", postId,
            {headers: HttpHeader.getContentTypeHttpHeaders()}
        );
    }

    getPosts(): Observable<IResponse<Post[]>> {
        return this._client.get<IResponse<Post[]>>(
            this._host + this.route + "get-posts"
        );
    }

    getPostsByAuthorId(accountId: number): Observable<IResponse<Post[]>> {

        return this._client.post<IResponse<Post[]>>(
            this._host + this.route + "get-posts-by-author-id", accountId,
            {headers: HttpHeader.getContentTypeHttpHeaders()}
        );
    }

    getPostsByCategoryId(categoryId: number): Observable<IResponse<Post[]>> {
        return this._client.post<IResponse<Post[]>>(
            this._host + this.route + "get-posts-by-category-id", categoryId,
            {headers: HttpHeader.getContentTypeHttpHeaders()}
        );
    }

    findPostsBySubstring(substring: string): Observable<IResponse<Post[]>> {
        return this._client.post<IResponse<Post[]>>(
            this._host + this.route + "find-posts-by-substring",
            {
                substring: substring
            },
            {headers: HttpHeader.getContentTypeHttpHeaders()}
        );
    }


    getPublishedPostsByAccount(): Observable<IResponse<Post[]>> {
        return this._client.get<IResponse<Post[]>>(
            this._host + this.route + "get-posts-with-status-published", {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }

    getDraftPostsByAccount(): Observable<IResponse<Post[]>> {
        return this._client.get<IResponse<Post[]>>(
            this._host + this.route + "get-posts-with-status-draft", {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }

    getPendingPostsByAccount(): Observable<IResponse<Post[]>> {
        return this._client.get<IResponse<Post[]>>(
            this._host + this.route + "get-posts-with-status-pending", {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }

    getRejectedPostsByAccount(): Observable<IResponse<Post[]>> {
        return this._client.get<IResponse<Post[]>>(
            this._host + this.route + "get-posts-with-status-rejected", {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }

    getPostsFromTrashByAccount(): Observable<IResponse<Post[]>> {
        return this._client.get<IResponse<Post[]>>(
            this._host + this.route + "get-posts-from-trash", {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }


    addPost(title: string, anons: string, fullText: string, categoryId: number): Observable<IResponse> {
        let body = {
            title: title,
            anons: anons,
            fullText: fullText,
            categoryId: categoryId
        };
        return this._client.post<IResponse>(this._host + this.route + "post/add",
            body, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    addPostWithStatusPending(title: string, anons: string, fullText: string, categoryId: number): Observable<IResponse> {
        let body = {
            title: title,
            anons: anons,
            fullText: fullText,
            categoryId: categoryId

        };
        return this._client.post<IResponse>(this._host + this.route + "post/add-with-status-pending",
            body, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    updatePost(postId: number, title: string, anons: string, fullText: string, categoryId: number): Observable<IResponse<Object>> {
        let body = {
            postId: postId,
            title: title,
            anons: anons,
            fullText: fullText,
            categoryId: categoryId

        };
        return this._client.post<IResponse>(this._host + this.route + "post/update",
            body, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    removePost(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/delete",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    setPostStatusDraftById(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/set-status-draft",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    setPostStatusPendingById(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/set-status-pending",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    postSendToTrashById(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/send-to-trash",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    restorePostById(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/restore",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    addLikeToPostById(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/add-like",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    removeLikeFromPostById(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/remove-like",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    addDislikeToPostById(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/add-dislike",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    removeDislikeFromPostById(postId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "post/remove-dislike",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    checkLikeByPostId(postId: number): Observable<IResponse<boolean>> {
        return this._client.post<IResponse<boolean>>(this._host + this.route + "post/check-like-by-post-id",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    checkDislikeByPostId(postId: number): Observable<IResponse<boolean>> {
        return this._client.post<IResponse<boolean>>(this._host + this.route + "post/check-dislike-by-post-id",
            postId, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    getLikedPostsByAccount(): Observable<IResponse<Post[]>> {
        return this._client.get<IResponse<Post[]>>(
            this._host + this.route + "get-liked-posts-by-account", {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }
}
