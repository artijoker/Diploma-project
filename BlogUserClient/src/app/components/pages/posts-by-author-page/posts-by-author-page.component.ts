import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {Post} from "../../../model/Post";
import {ComparePosts} from "../../../comparePosts";

@Component({
    selector: 'app-posts-by-author-page',
    templateUrl: './posts-by-author-page.component.html',
    styleUrls: ['./posts-by-author-page.component.css']
})
export class PostsByAuthorPageComponent implements OnInit {

    isPostsLoadComplete: boolean = false;
    authorId: number;
    posts: Post[] = [];

    constructor(public _activateRoute: ActivatedRoute,
                public _router: Router,
                public _postService: PostService) {
        this.authorId = this._activateRoute.snapshot.params['author-id'];
    }

    ngOnInit(): void {
        this._postService.getPostsByAuthorId(this.authorId)
            .subscribe(response => {
                if (response.succeeded) {
                    this.posts = response.result;
                    this.posts.sort(ComparePosts.descendingDate());
                    this.isPostsLoadComplete = true;
                } else {
                    alert(response.message);
                }
            });
    }
}
