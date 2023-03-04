import {HttpHeaders} from "@angular/common/http";

export class HttpHeader {
    public static getAuthorizationHttpHeader(){
        let token = localStorage.getItem("token");
        return new HttpHeaders().set("Authorization", "Bearer " + token);
    }

    public static getAuthorizationAndContentTypeHttpHeaders(){
        let token = localStorage.getItem("token");
        return new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");
    }

    public static getContentTypeHttpHeaders(){
        return new HttpHeaders().set("content-type", "application/json");
    }
}
