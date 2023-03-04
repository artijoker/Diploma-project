import {Injectable} from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationCheckService {

    constructor() {
    }

    isAdministratorLoggedIn(){
        let token = localStorage.getItem("token");
        if (token !== null) {
            let tokenDecode: { role: string } = jwt_decode(token);
            return tokenDecode.role === "admin";
        }
        return false;
    }


}
