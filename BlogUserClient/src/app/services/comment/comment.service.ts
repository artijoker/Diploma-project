import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../responses/IResponse";
import {Category} from "../../model/Category";
import {Comment} from "../../model/Comment";
import {HttpHeader} from "../../httpHeader";
import {Post} from "../../model/Post";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    private route = "comments/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }


    getCommentsByPostId(postId: number): Observable<IResponse<Comment[]>> {
        return this._client.post<IResponse<Comment[]>>(
            this._host + this.route + "get-comments-by-post-id",
            postId,
            {
                headers: HttpHeader.getContentTypeHttpHeaders()
            });
    }

    getCommentsByAccount(): Observable<IResponse<Comment[]>> {
        return this._client.get<IResponse<Comment[]>>(
            this._host + this.route + "get-comments-by-account",
            {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }

    addComment(text: string, postId: number): Observable<IResponse<Comment[]>> {
        let body = {
            postId: postId,
            text: text
        };
        return this._client.post<IResponse<Comment[]>>(
            this._host + this.route + "comment/add",
            body,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    updateComment(newText: string, commentId: number): Observable<IResponse> {
        let body = {
            commentId: commentId,
            newText: newText
        };
        return this._client.post<IResponse>(
            this._host + this.route + "comment/update",
            body,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    removeComment(commentId: number): Observable<IResponse> {
        return this._client.post<IResponse>(
            this._host + this.route + "comment/delete",
            commentId,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }
}
