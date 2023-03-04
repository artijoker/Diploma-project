import {Component, OnInit} from '@angular/core';
import {Account} from "../../../../model/Account";
import {Router} from "@angular/router";
import {AccountService} from "../../../../services/account/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILogInResponse} from "../../../../responses/ILogInResponse";

@Component({
    selector: 'app-account-editor-page',
    templateUrl: './account-editor-page.component.html',
    styleUrls: ['./account-editor-page.component.css']
})
export class AccountEditorPageComponent implements OnInit {

    form: FormGroup;
    account?: Account;
    isLoadAccountCompleted: boolean = false;

    constructor(private _router: Router, private _accountService: AccountService) {
        this.form = new FormGroup({
            "email": new FormControl("", Validators.email
            ),
            "login": new FormControl(""),
            "newPassword": new FormControl("")
        });
    }

    ngOnInit(): void {
        this._accountService.getAccount()
            .subscribe(
                response => {
                    if (response.succeeded){
                        this.account = response.result;
                        this.form.controls['email'].setValue(this.account.email);
                        this.form.controls['login'].setValue(this.account.loginNickName);
                        this.isLoadAccountCompleted = true;
                    }
                    else
                        alert(response.message);
                });
    }

    submit() {
        let value = this.form.value;

        if (value.email === "") {
            alert("Введите email");
            return;
        }
        if (!this.form.controls['email'].valid) {
            alert("Невалидный email!");
            return;
        }
        if (value.login.trim() === "") {
            alert("Введите логин");
            return;
        }
        let email = value.email;
        let login = value.login;
        let newPassword = value.newPassword;

        if (this.account?.email !== email || this.account?.loginNickName !== login || newPassword !== ""){
            this._accountService.updateAccount(email, login, newPassword)
                .subscribe((response) => {
                    if (response.succeeded) {
                        alert("Данные учетной записи сохранены");
                        this._router.navigate(
                            ['/my-profile']
                        );
                    } else {
                        alert(response.message);
                    }
                });
        }
    }

    cancel(){
        this._router.navigate(
            ['/my-profile']
        );
    }

}
