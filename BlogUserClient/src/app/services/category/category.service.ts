import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/Category';
import {IResponse} from '../../responses/IResponse';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private route = "categories/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }

    getCategories(): Observable<IResponse<Category[]>> {
        return this._client.get<IResponse<Category[]>>(
            this._host  + this.route +  "get-categories"
        );
    }

}
