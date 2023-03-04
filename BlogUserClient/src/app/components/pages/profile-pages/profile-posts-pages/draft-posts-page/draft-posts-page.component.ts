import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../../../services/post/post.service";
import {DataService} from "../../../../../services/data/data.service";
import {Router} from "@angular/router";
import {Post} from "../../../../../model/Post";
import {ProfilePosts} from "../../../../../profile-posts";

@Component({
    selector: 'app-draft-posts-page',
    templateUrl: './draft-posts-page.component.html',
    styleUrls: ['./draft-posts-page.component.css']
})
export class DraftPostsPageComponent implements OnInit {

    isPostsLoadComplete: boolean = false;
    profilePosts?: ProfilePosts;
    constructor(private _postService: PostService,
                private _router: Router) {
    }

    ngOnInit(): void {
        this._postService.getDraftPostsByAccount()
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
