import {Component, OnInit} from '@angular/core';
import {Category} from "../../../../model/Category";
import {Post} from "../../../../model/Post";
import {PostService} from "../../../../services/post/post.service";
import {ComparePosts} from "../../../../comparePosts";

@Component({
    selector: 'app-profile-pages-liked-posts-page',
    templateUrl: './profile-liked-posts-page.component.html',
    styleUrls: ['./profile-liked-posts-page.component.css']
})
export class ProfileLikedPostsPageComponent implements OnInit {

    isPostsLoadComplete: boolean = false;
    posts: Post[] = [];


    constructor(private _postService: PostService) { }

    ngOnInit(): void {
        this._postService.getLikedPostsByAccount()
            .subscribe(response => {
                if (response.succeeded) {
                    this.posts = response.result;
                    this.posts.sort(ComparePosts.descendingDate());
                    this.isPostsLoadComplete = true;
                }
                else {
                    alert(response.message);
                }
            });
    }

}
