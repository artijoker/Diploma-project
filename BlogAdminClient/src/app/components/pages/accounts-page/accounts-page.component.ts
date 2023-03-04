import {Component, OnInit} from '@angular/core';

import {AccountService} from 'src/app/services/account/account.service';

import {Account} from "../../../models/Account";
import {Role} from "../../../models/Role";
import {Category} from "../../../models/Category";
import {PostService} from "../../../services/post/post.service";
import {AuthorizationCheckService} from "../../../services/data/authorization-check.service";
import {Router} from "@angular/router";
import JWTDecode from "jwt-decode";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryModalWindowComponent} from "../../modal-windows/category/category-modal-window.component";
import {
    AddEditAccountModalWindowComponent
} from "../../modal-windows/add-edit-account/add-edit-account-modal-window.component";

@Component({
    selector: 'app-accounts-page',
    templateUrl: './accounts-page.component.html',
    styleUrls: ['./accounts-page.component.css']
})
export class AccountsPageComponent implements OnInit {

    accounts: Account[] = [];
    isAccountsLoadComplete: boolean = false;

    constructor(private _router: Router,
                private _accountService: AccountService,
                private _postService: PostService,
                private _modalService: NgbModal,
                private _authorizationCheckService: AuthorizationCheckService) {
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );
        this.loadAccounts();
    }

    loadAccounts(){
        this._accountService.getAccounts()
            .subscribe(response => {
                if (response.succeeded) {
                    this.accounts = response.result;
                    this.sortName();
                    this.isAccountsLoadComplete = true;
                } else {
                    alert(response.message);
                }
            });

    }

    addAccount() {
        let modalRef = this._modalService.open(AddEditAccountModalWindowComponent,
            {size: "lg"});
        modalRef.result.then(
            result => {
                if (result){
                    this.isAccountsLoadComplete = false;
                    this.loadAccounts();
                }
            }
            ).catch(reason => {
        });
    }


    editAccount(accountId: number) {
        let modalRef = this._modalService.open(AddEditAccountModalWindowComponent,
            {size: "lg"});
        modalRef.componentInstance.accountId = accountId;
        modalRef.result.then(
            result => {
                if (result === true){
                    this.isAccountsLoadComplete = false;
                    this.loadAccounts();
                }
            }
        ).catch(reason => {
        });
    }

    bannedAccount(account: Account) {
        this._accountService.bannedAccount(account.id)
            .subscribe(response => {
                if (response.succeeded) {
                    account.isBanned = true;
                } else {
                    alert(response.message);
                }
            });
    }

    unlockAccount(account: Account) {
        this._accountService.unlockAccount(account.id)
            .subscribe(response => {
                if (response.succeeded) {
                    account.isBanned = false;
                } else {
                    alert(response.message);
                }
            });
    }

    deleteAccount(account: Account) {
        this._accountService.deleteAccount(account.id)
            .subscribe(response => {
                if (response.succeeded) {
                    account.isDeleted = true;
                } else {
                    alert(response.message);
                }
            });
    }

    goToPostsByAccountId(accountId: number) {
        this._router.navigate(
            ['posts-by-account', accountId]
        );
    }

    sortEmail() {
        this.accounts.sort((a, b) => {
            if (a.email > b.email)
                return 1;
            if (a.email < b.email)
                return -1;
            return 0;
        });
    }

    sortName() {
        this.accounts.sort((a, b) => {
            if (a.loginNickName > b.loginNickName)
                return 1;
            if (a.loginNickName < b.loginNickName)
                return -1;
            return 0;
        });
    }

    sortRole() {
        this.accounts.sort((a, b) => {
            if (a.roleName > b.roleName)
                return 1;
            if (a.roleName < b.roleName)
                return -1;
            return 0;
        });
    }

    sortDate() {
        this.accounts.sort((a, b) => {
            if (a.registered < b.registered)
                return 1;
            if (a.registered > b.registered)
                return -1;
            return 0;
        });
    }


    sortPublishedPosts() {
        this.accounts.sort((a, b) => {
            if (a.quantityPublishedPosts < b.quantityPublishedPosts)
                return 1;
            if (a.quantityPublishedPosts > b.quantityPublishedPosts)
                return -1;
            return 0;
        });
    }

    sortBanned() {
        this.accounts.sort((a, b) => {
            if (a.isBanned < b.isBanned)
                return 1;
            if (a.isBanned > b.isBanned)
                return -1;
            return 0;
        });
    }

    sortDeleted() {
        this.accounts.sort((a, b) => {
            if (a.isDeleted < b.isDeleted)
                return 1;
            if (a.isDeleted > b.isDeleted)
                return -1;
            return 0;
        });
    }
}
