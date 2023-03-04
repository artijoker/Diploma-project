import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../responses/IResponse";
import {HttpHeader} from "../../httpHeader";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

    private route = "complaints/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }

    addComplaintOnPost(text: string, postId: number): Observable<IResponse> {
        let body = {
            text: text,
            postId: postId
        };
        return this._client.post<IResponse>(
            this._host + this.route + "add-complaint-on-post",
            body,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }

    addComplaintOnComment(text: string, commentId: number): Observable<IResponse> {
        let body = {
            text: text,
            commentId: commentId
        };
        return this._client.post<IResponse>(
            this._host + this.route + "add-complaint-on-comment",
            body,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            });
    }
}
