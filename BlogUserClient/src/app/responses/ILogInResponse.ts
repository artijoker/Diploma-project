import { Account } from "src/app/model/Account";
import { IResponse } from "./IResponse";

export interface ILogInResponse extends IResponse<Account> {
    token: string;
}
