import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LogInService} from "../../../services/login/log-in.service";

@Component({
    selector: 'app-sing-in-page',
    templateUrl: './sing-in-page.component.html',
    styleUrls: ['./sing-in-page.component.css']
})
export class SingInPageComponent implements OnInit {

    formSingIn: FormGroup;
    isLoad: boolean = false;

    constructor(private _router: Router,
                private _logInService: LogInService) {

        this.formSingIn = new FormGroup({
            "login": new FormControl("", Validators.required),
            "password": new FormControl("", Validators.required)
        });
    }

    ngOnInit(): void {
    }

    submit() {
        if (this.formSingIn.valid) {
            let value = this.formSingIn.value;
            this.isLoad = true;
            this._logInService.authorize(value.login, value.password)
                .subscribe((response) => {
                    if (response.succeeded) {
                        localStorage.setItem("token", response.token);
                        this._router.navigate(
                            ['/publications']
                        );
                    } else {
                        this.isLoad = false;
                        alert(response.message);
                    }
                });
        } else {
            if (!this.formSingIn.controls['login'].valid)
                alert("Введите логин!");
            else
                alert("Введите пароль!");

        }
    }

}
