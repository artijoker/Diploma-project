import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Account} from '../../model/Account'
import {IResponse} from '../../responses/IResponse';
import {ILogInResponse} from "../../responses/ILogInResponse";
import {HttpHeader} from "../../httpHeader";


@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }

    private route = "accounts/";


    registration(email: string, login: string, password: string): Observable<ILogInResponse> {
        return this._client.post<ILogInResponse>(this._host + this.route + "account/registration", {
            email: email,
            login: login,
            password: password
        }).pipe(catchError(err => {
            alert(err.message);
            return [];
        }));
    }

    getAuthors(): Observable<IResponse<Account[]>> {
        return this._client.get<IResponse<Account[]>>(
            this._host + this.route + "get-authors"
        );
    }


    getAccount(): Observable<IResponse<Account>> {
        return this._client.get<IResponse<Account>>(this._host + this.route + "account/get-my-account",
            {headers: HttpHeader.getAuthorizationHttpHeader()});
    }


    updateAccount(email: string, login: string, newPassword: string): Observable<IResponse> {
        let body = {
            email: email,
            login: login,
            newPassword: newPassword
        }
        return this._client.post<IResponse>(
            this._host + this.route + "account/edit",
            body,
            {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            }
        );
    }

    deleteAccount(): Observable<IResponse> {
        return this._client.get<IResponse>(
            this._host + this.route + "account/delete",
            {headers: HttpHeader.getAuthorizationHttpHeader()}
        );
    }

    getSubscriptions(): Observable<IResponse<Account[]>> {
        return this._client.get<IResponse<Account[]>>(
            this._host + this.route + "get-my-subscriptions",
            {headers: HttpHeader.getAuthorizationHttpHeader()}
        );
    }

    subscribeToAuthor(authorId: number): Observable<IResponse> {
        return this._client.post<IResponse>(
            this._host + this.route + "subscribe-to-author",
            authorId,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }

    unsubscribeFromAuthor(authorId: number): Observable<IResponse> {
        return this._client.post<IResponse>(
            this._host + this.route + "unsubscribe-from-author",
            authorId,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }

    checkSubscribedToAuthor(authorId: number): Observable<IResponse<boolean>> {
        return this._client.post<IResponse<boolean>>(
            this._host + this.route + "check-subscribed-to-author",
            authorId,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }
}
