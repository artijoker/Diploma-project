import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {Post} from "../../../models/Post";
import {AuthorizationCheckService} from "../../../services/data/authorization-check.service";

@Component({
    selector: 'app-posts-by-account-page',
    templateUrl: './posts-by-account-page.component.html',
    styleUrls: ['./posts-by-account-page.component.css']
})
export class PostsByAccountPageComponent implements OnInit {

    isPostsLoadComplete: boolean = false;
    accountId: number;
    posts: Post[] = [];

    constructor(public _activateRoute: ActivatedRoute,
                public _router: Router,
                public _postService: PostService,
                private _authorizationCheckService: AuthorizationCheckService) {
        this.accountId = this._activateRoute.snapshot.params['account-id'];
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );

        this._postService.getPostsByAuthorId(this.accountId)
            .subscribe(response => {
                if (response.succeeded) {
                    this.posts = response.result;
                    this.posts.sort((a: Post, b: Post) => {
                        if (a.lastChange < b.lastChange)
                            return 1;
                        if (a.lastChange > b.lastChange)
                            return -1;
                        return 0;
                    });
                    this.isPostsLoadComplete = true;
                } else {
                    alert(response.message);
                }
            });
    }

}
