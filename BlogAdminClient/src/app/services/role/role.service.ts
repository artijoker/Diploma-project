import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../responses/IResponse";
import {Category} from "../../models/Category";
import {Role} from "../../models/Role";
import {HttpHeader} from "../../httpHeader";

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private route = "admin/roles/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }


    getRoles(): Observable<IResponse<Role[]>> {
        return this._client.get<IResponse<Role[]>>(
            this._host + this.route + "get-roles",
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }
}
