import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IResponse} from '../../responses/IResponse';
import {Account} from "../../models/Account";
import {HttpHeader} from "../../httpHeader";


@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private route = "admin/accounts/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }

    getAccounts(): Observable<IResponse<Account[]>> {
        return this._client.get<IResponse<Account[]>>(
            this._host + this.route + "get-all-accounts",
            {headers: HttpHeader.getAuthorizationHttpHeader()});
    }

    getAccount(): Observable<IResponse<Account>> {
        return this._client.get<IResponse<Account>>(
            this._host + "accounts/account/get-my-account",
            {headers: HttpHeader.getAuthorizationHttpHeader()});
    }

    getAccountById(accountId: number): Observable<IResponse<Account>> {
        return this._client.post<IResponse<Account>>(
            this._host + this.route + "account/get-by-id",
            accountId,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()});
    }

    addAccount(email: string, login: string, password: string, roleId: number)
        : Observable<IResponse<Account>> {
        let body = {
            email: email,
            login: login,
            password: password,
            roleId: roleId
        }
        return this._client.post<IResponse<Account>>(
            this._host + this.route + "account/add", body, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            }
        );
    }

    updateAccount(accountId: number, email: string, login: string, newPassword: string, roleId: number)
        : Observable<IResponse<Account>> {
        let body = {
            accountId: accountId,
            email: email,
            login: login,
            newPassword: newPassword,
            roleId: roleId
        }
        return this._client.post<IResponse<Account>>(
            this._host + this.route + "account/edit", body, {
                headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()
            }
        );
    }


    bannedAccount(accountId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "account/banned-by-id",
            accountId,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()});
    }

    unlockAccount(accountId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "account/unlock-by-id",
            accountId,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }

    deleteAccount(accountId: number): Observable<IResponse> {
        return this._client.post<IResponse>(this._host + this.route + "account/delete-by-id",
            accountId,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }
}
