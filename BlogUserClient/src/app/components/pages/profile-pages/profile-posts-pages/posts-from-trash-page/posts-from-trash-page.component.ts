import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../../model/Post";
import {PostService} from "../../../../../services/post/post.service";
import {Router} from "@angular/router";
import {ProfilePosts} from "../../../../../profile-posts";

@Component({
    selector: 'app-posts-from-trash-page',
    templateUrl: './posts-from-trash-page.component.html',
    styleUrls: ['./posts-from-trash-page.component.css']
})
export class PostsFromTrashPageComponent implements OnInit {

    isPostsLoadComplete: boolean = false;
    posts: Post[] = [];
    profilePosts?: ProfilePosts;
    constructor(private _postService: PostService,
                private _router: Router) {
    }

    ngOnInit(): void {
        this._postService.getPostsFromTrashByAccount()
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
