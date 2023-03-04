import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogInResponse } from 'src/app/responses/ILogInResponse';
import { LogInService } from 'src/app/services/login/log-in.service';

import { AccountService } from '../../../services/account/account.service'

@Component({
    selector: 'app-sing-up-page',
    templateUrl: './sing-up-page.component.html',
    styleUrls: ['./sing-up-page.component.css']
})
export class SingUpPageComponent implements OnInit {

    formSingUp: FormGroup;
    isLoad: boolean = false;
    constructor(private _router: Router,
        private _accountService: AccountService,
                private _logInService: LogInService) {

        this.formSingUp = new FormGroup({
            "email": new FormControl("", [
                Validators.required,
                Validators.email
            ]),
            "login": new FormControl("", Validators.required),
            "password": new FormControl("", Validators.required)
        });
    }
    ngOnInit(): void {

    }

    submit() {
        if (this.formSingUp.valid) {
            let value = this.formSingUp.value;
            this.isLoad = true;
            this._accountService.registration(value.email, value.login, value.password)
                .subscribe((response: ILogInResponse) => {
                    if (response.succeeded) {
                        localStorage.setItem("token", response.token);
                        this._router.navigate(
                            ['/blog']
                        );
                    }
                    else {
                        this.isLoad = false;
                        alert(response.message);
                    }
                });
        }
        else{
            if (!this.formSingUp.controls['email'].valid)
                alert("Невалидный  email!");
            else if (!this.formSingUp.controls['login'].valid)
                alert("Невалидный логин!");
            else
                alert("Невалидный пароль!");
        }

    }

}
