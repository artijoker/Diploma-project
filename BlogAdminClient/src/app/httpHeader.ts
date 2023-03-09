import {HttpHeaders} from "@angular/common/http";

export class HttpHeader {
    public static getAuthorizationHttpHeader(){
        let token = localStorage.getItem("token");
        if (token)
            return new HttpHeaders().set("Authorization", "Bearer " + token);
        return new HttpHeaders();
    }

    public static getAuthorizationAndContentTypeHttpHeaders(){
        let token = localStorage.getItem("token");
         if (token)
            return new HttpHeaders().set("Authorization", "Bearer " + token)
                .set("content-type", "application/json");
        return HttpHeader.getContentTypeHttpHeaders();
    }

    public static getContentTypeHttpHeaders(){
        return new HttpHeaders().set("content-type", "application/json");
    }
}
