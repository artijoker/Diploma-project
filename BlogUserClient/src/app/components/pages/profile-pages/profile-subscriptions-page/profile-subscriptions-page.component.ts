import {Component, OnInit} from '@angular/core';
import {Account} from "../../../../model/Account";
import {Router} from "@angular/router";
import {AccountService} from "../../../../services/account/account.service";

@Component({
    selector: 'app-profile-pages-subscriptions-page',
    templateUrl: './profile-subscriptions-page.component.html',
    styleUrls: ['./profile-subscriptions-page.component.css']
})
export class ProfileSubscriptionsPageComponent implements OnInit {

    subscriptions: Account[] = [];
    isSubscriptionsLoadComplete: boolean = false;

    constructor(private _router: Router,
                private _accountService: AccountService) {
    }

    ngOnInit(): void {
        this._accountService.getSubscriptions()
            .subscribe(
                response => {
                    if (response.succeeded) {
                        this.subscriptions = response.result;
                        this.isSubscriptionsLoadComplete = true;
                    } else {
                        alert(response.message);
                    }
                }
            );
    }
    subscribeToAuthor(author: Account) {
        this._accountService.subscribeToAuthor(author.id).subscribe(
            response => {
                if (response.succeeded) {
                    alert("Вы подписались на автора " + author.loginNickName);
                } else {
                    alert(response.message);
                }
            }
        );
    }
    unsubscribeFromAuthor(author: Account) {
        this._accountService.unsubscribeFromAuthor(author.id).subscribe(
            response => {
                if (response.succeeded) {
                    alert("Вы отписались на автора " + author.loginNickName);
                } else {
                    alert(response.message);
                }
            }
        );
    }
}
