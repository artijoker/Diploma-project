import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../models/Role";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AccountService} from "../../../services/account/account.service";
import {RoleService} from "../../../services/role/role.service";
import {Account} from "../../../models/Account";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-add-edit-account',
    templateUrl: './add-edit-account-modal-window.component.html',
    styleUrls: ['./add-edit-account-modal-window.component.css']
})
export class AddEditAccountModalWindowComponent implements OnInit {
    @Input() accountId?: number;
    account?: Account;
    form: FormGroup;
    roles: Role[] = [];
    selectedRole?: Role;

    constructor(public activeModal: NgbActiveModal,
                private _accountService: AccountService,
                private _roleService: RoleService) {
        this.form = new FormGroup({
            "email": new FormControl("", Validators.email),
            "login": new FormControl(""),
            "password": new FormControl(""),
            "role": new FormControl()
        });
    }

    ngOnInit(): void {
        if (this.accountId !== undefined) {
            this._accountService.getAccountById(this.accountId)
                .subscribe(response => {
                    if (response.succeeded) {
                        this.account = response.result;
                        this.form.controls['email'].setValue(this.account.email);
                        this.form.controls['login'].setValue(this.account.loginNickName);
                        this._roleService.getRoles().subscribe(
                            response => {
                                if (response.succeeded) {
                                    this.roles = response.result;
                                    this.selectedRole = this.roles.filter(r => r.id === this.account?.roleId)[0];
                                } else {
                                    alert(response.message);
                                }
                            }
                        );

                    } else {
                        alert(response.message);
                    }
                });
        } else {
            this._roleService.getRoles().subscribe(
                response => {
                    if (response.succeeded) {
                        this.roles = response.result;
                    } else {
                        alert(response.message);
                    }
                }
            );
        }

    }

    onChange(role: Role) {
        this.selectedRole = role;
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
        if (this.account === undefined) {
            if (value.password.trim() === "") {
                alert("Введите пароль");
                return;
            }
        }
        if (this.selectedRole === undefined) {
            alert("Выберите роль");
            return;
        }

        let email = value.email;
        let login = value.login.trim();
        let password = value.password.trim();


        if (this.account === undefined) {
            this._accountService.addAccount(
                email,
                login,
                password,
                this.selectedRole.id)
                .subscribe((response) => {
                    if (response.succeeded) {
                        alert("Создана новая учетная запись!");
                        this.activeModal.close(true);
                    } else {
                        alert(response.message);
                    }
                });
        } else {
            if (this.account.email !== email ||
                this.account.loginNickName !== login ||
                password !== "" ||
                this.account.roleId !== this.selectedRole.id
            )
                this._accountService.updateAccount(
                    this.account.id,
                    email,
                    login,
                    password,
                    this.selectedRole.id)
                    .subscribe((response) => {
                        if (response.succeeded) {
                            alert("Данные учетной записи обновленны");
                            this.activeModal.close(true);
                        } else {
                            alert(response.message);
                        }
                    });
            else {
                this.activeModal.close();
            }
        }


    }
}

