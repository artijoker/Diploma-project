import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../../services/account/account.service";
import {Account} from "../../../../model/Account";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile-pages-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

    account?: Account;

    constructor(private _router: Router, private _accountService: AccountService) {
    }

    ngOnInit(): void {
        this._accountService.getAccount()
            .subscribe(response => {
                    if (response.succeeded) {
                        this.account = response.result;
                    } else {
                        alert(response.message);
                    }
                }
            );
    }

    editAccount() {
        this._router.navigate(
            ['/edit-account']
        );
    }

    deleteAccount() {
        this._accountService.deleteAccount().subscribe(
            response => {
                if (response.succeeded) {
                    localStorage.clear();
                    this._router.navigate(['/blog']);
                } else {
                    alert(response.message);
                }
            }
        );


    }
}
