import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../responses/IResponse";
import {HttpHeader} from "../../httpHeader";
import {ComplaintPost} from "../../models/ComplaintPost";
import {HttpClient} from "@angular/common/http";
import {ComplaintComment} from "../../models/ComplaintComment";

@Injectable({
    providedIn: 'root'
})
export class ComplaintService {

    private route = "admin/complaints/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }

    getAllComplaintsOnPosts(): Observable<IResponse<ComplaintPost[]>> {
        return this._client.get<IResponse<ComplaintPost[]>>(
            this._host + this.route + "get-all-complaints-on-post",
            {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }

    getAllComplaintsOnComment(): Observable<IResponse<ComplaintComment[]>> {
        return this._client.get<IResponse<ComplaintComment[]>>(
            this._host + this.route + "get-all-complaints-on-comments",
            {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }

    getComplaintsOnPostsByAccountId(accountId: number): Observable<IResponse<ComplaintPost[]>> {
        return this._client.post<IResponse<ComplaintPost[]>>(
            this._host + this.route + "get-complaints-on-post-by-account-id",
            accountId,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    getComplaintsOnPostsByPostId(postId: number): Observable<IResponse<ComplaintPost[]>> {
        return this._client.post<IResponse<ComplaintPost[]>>(
            this._host + this.route + "get-complaints-on-post-by-post-id",
            postId,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    getComplaintsOnCommentsByAccountId(accountId: number): Observable<IResponse<ComplaintComment[]>> {
        return this._client.post<IResponse<ComplaintComment[]>>(
            this._host + this.route + "get-complaints-on-comment-by-account-id",
            accountId,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    getComplaintsOnCommentsByCommentId(commentId: number): Observable<IResponse<ComplaintComment[]>> {
        return this._client.post<IResponse<ComplaintComment[]>>(
            this._host + this.route + "get-complaints-on-comment-by-comment-id",
            commentId,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    removeComplaintOnPostById(complaintId: number): Observable<IResponse> {
        return this._client.post<IResponse>(
            this._host + this.route + "complaint-on-post/delete-by-id",
            complaintId,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    removeComplaintOnCommentById(complaintId: number): Observable<IResponse> {
        return this._client.post<IResponse>(
            this._host + this.route + "complaint-on-comment/delete-by-id",
            complaintId,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    countComplaintsOnComment(): Observable<IResponse<number>> {
        return this._client.get<IResponse<number>>(
            this._host + this.route + "count-complaints-on-comments",
            {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }

    countComplaintsOnPosts(): Observable<IResponse<number>> {
        return this._client.get<IResponse<number>>(
            this._host + this.route + "count-complaints-on-posts",
            {
                headers: HttpHeader.getAuthorizationHttpHeader()
            });
    }
}
