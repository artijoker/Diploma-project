import { IResponse } from "../IResponse";
import {Account} from "../../models/Account";

export interface ILogInResponse extends IResponse<Account> {
    token: string;
}
