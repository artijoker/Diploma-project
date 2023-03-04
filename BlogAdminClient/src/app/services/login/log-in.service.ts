import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ILogInResponse} from "../../responses/authentication/ILogInResponse";
import {HttpHeader} from "../../httpHeader";

@Injectable({
    providedIn: 'root'
})
export class LogInService {

    private route = "login/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }


    authorize(login: string, password: string): Observable<ILogInResponse> {
        return this._client.post<ILogInResponse>(this._host + this.route + "admin",
            {
                login: login,
                password: password
            },
            {headers: HttpHeader.getContentTypeHttpHeaders()}
        ).pipe(catchError(err => {
            alert(err.message);
            return [];
        }));
    }
}
