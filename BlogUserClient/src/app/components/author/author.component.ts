import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

import {DataService} from 'src/app/services/data/data.service';
import {PostService} from 'src/app/services/post/post.service';
import {Account} from "../../model/Account";
import jwt_decode from "jwt-decode";

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

    @Input() author?: Account
    @Input() isSubscribedToAuthor: boolean = false;
    @Output() subscribe: EventEmitter<object>  = new EventEmitter<object>();
    @Output() unsubscribe: EventEmitter<object>  = new EventEmitter<object>();

    accountId?: number;
    isAuthorized: boolean = false;

    constructor(
        private _router: Router,
        private _postService: PostService) {
    }

    ngOnInit(): void {
        console.dir(this.author);
        let token = localStorage.getItem("token");
        if (token !== null) {
            this.isAuthorized = true;
            let tokenDecode: { nameid: string } = jwt_decode(token);
            this.accountId = parseInt(tokenDecode.nameid);
        }
    }

    goToPostsByAuthorId(authorId: number) {
        this._router.navigate(['authors/posts-by-author', authorId]);
    }
}
