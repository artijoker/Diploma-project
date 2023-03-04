import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../../model/Post";
import {PostService} from "../../../../../services/post/post.service";
import {Router} from "@angular/router";
import {ProfilePosts} from "../../../../../profile-posts";

@Component({
    selector: 'app-published-posts-page',
    templateUrl: './published-posts-page.component.html',
    styleUrls: ['./published-posts-page.component.css']
})
export class PublishedPostsPageComponent implements OnInit{
    isPostsLoadComplete: boolean = false;
    posts: Post[] = [];
    profilePosts?: ProfilePosts;
    constructor(protected _postService: PostService,
                protected _router: Router) {
    }

    ngOnInit(): void {
        this.getPublishedPosts()
    }

    getPublishedPosts() {
        this._postService.getPublishedPostsByAccount()
            .subscribe(response => {
                if (response.succeeded) {
                    let posts = response.result.sort((a, b) => {
                        if (a.lastChange < b.lastChange)
                            return 1;
                        if (a.lastChange > b.lastChange)
                            return -1;
                        return 0;
                    });
                    this.profilePosts = new ProfilePosts(this._postService, this._router, posts);
                    this.isPostsLoadComplete = true;
                } else {
                    alert(response.message);
                }
            });
    }
}
