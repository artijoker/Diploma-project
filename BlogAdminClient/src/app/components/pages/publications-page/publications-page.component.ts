import {Component, OnInit} from '@angular/core';
import {AuthorizationCheckService} from 'src/app/services/data/authorization-check.service';
import {PostService} from 'src/app/services/post/post.service';
import {CategoryService} from 'src/app/services/category/category.service';
import {Category} from 'src/app/models/Category';
import JWTDecode from "jwt-decode";
import {Router} from "@angular/router";
import {Post} from "../../../models/Post";

@Component({
    selector: 'app-publications',
    templateUrl: './publications-page.component.html',
    styleUrls: ['./publications-page.component.css']
})
export class PublicationsPageComponent implements OnInit {

    isPostsLoadComplete: boolean = false;
    posts: Post[] = [];
    linkNumber: number = 0;

    constructor(private _router: Router,
                private _postService: PostService,
                private _authorizationCheckService: AuthorizationCheckService) {
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );
        this.getPublishedPosts();
    }

    toggle(newLinkNumber: number) {
        this.linkNumber = newLinkNumber;
    }

    getPublishedPosts() {
        this._postService.getPosts()
            .subscribe(response => {
                if (response.succeeded) {
                    this.posts = response.result;
                    this.isPostsLoadComplete = true;
                } else {
                    alert(response.message);
                }
            });
    }

    getPendingPosts() {
        this._postService.getPendingPosts()
            .subscribe(response => {
                if (response.succeeded) {
                    this.posts = response.result;
                    this.isPostsLoadComplete = true;
                } else {
                    alert(response.message);
                }
            });
    }
}


