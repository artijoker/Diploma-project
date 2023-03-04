import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/Post";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {AuthorizationCheckService} from "../../../services/data/authorization-check.service";

@Component({
  selector: 'app-posts-by-category-page',
  templateUrl: './posts-by-category-page.component.html',
  styleUrls: ['./posts-by-category-page.component.css']
})
export class PostsByCategoryPageComponent implements OnInit {

    isPostsLoadComplete: boolean = false;
    categoryId: number;
    posts: Post[] = [];

    constructor(public _activateRoute: ActivatedRoute,
                public _router: Router,
                public _postService: PostService,
                private _authorizationCheckService: AuthorizationCheckService) {
        this.categoryId = this._activateRoute.snapshot.params['category-id'];
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );

        this._postService.getPostsByCategoryId(this.categoryId)
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
