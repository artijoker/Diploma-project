import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../models/Category';
import {IResponse} from '../../responses/IResponse';
import {HttpHeader} from "../../httpHeader";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private route = "admin/categories/";

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }


    getCategories(): Observable<IResponse<Category[]>> {
        return this._client.get<IResponse<Category[]>>(
            this._host + "categories/get-categories");
    }

    addNewCategory(categoryName: string): Observable<IResponse> {
        return this._client.post<IResponse>(
            this._host + this.route + "category/add",
            {categoryName: categoryName},
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }

    editCategory(categoryId: number, categoryName: string): Observable<IResponse> {
        let body = {
            categoryId: categoryId,
            categoryName: categoryName
        }
        return this._client.post<IResponse>(
            this._host + this.route + "category/edit",
            body,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }

    deleteCategory(categoryId: number): Observable<IResponse> {
        return this._client.post<IResponse>(
            this._host + this.route + "category/delete-by-id",
            categoryId,
            {headers: HttpHeader.getAuthorizationAndContentTypeHttpHeaders()}
        );
    }
}


