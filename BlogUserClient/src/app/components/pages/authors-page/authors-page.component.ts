import {Component, OnInit} from '@angular/core';
import {AccountService} from 'src/app/services/account/account.service';
import {Account} from "../../../model/Account";
import {Router} from "@angular/router";

@Component({
    selector: 'app-authors-page',
    templateUrl: './authors-page.component.html',
    styleUrls: ['./authors-page.component.css']
})
export class AuthorsPageComponent implements OnInit {

    authors: Account[] = [];
    subscriptions: Account[] = [];
    isAuthorsLoadComplete: boolean = false;

    constructor( private _router: Router,
                 private _accountService: AccountService) {
    }

    ngOnInit(): void {

        this._accountService.getAuthors()
            .subscribe(response => {
                if (response.succeeded) {
                    this.authors = response.result;
                    this.authors.sort(
                        (a, b) => {
                            if (a.quantityPublishedPosts < b.quantityPublishedPosts)
                                return 1;
                            if (a.quantityPublishedPosts > b.quantityPublishedPosts)
                                return -1;
                            return 0;
                        });
                    this.isAuthorsLoadComplete = true;
                    if (localStorage.getItem("token")){
                        this._accountService.getSubscriptions()
                            .subscribe(
                                response => {
                                    if (response.succeeded){
                                        this.subscriptions = response.result;
                                    }
                                    else
                                        alert(response.message);
                                }
                            );
                    }
                } else {
                    alert(response.message);
                }
            });
    }

    isSubscribedToAuthor(author: Account){
        return this.subscriptions.some(a => a.id === author.id);
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
