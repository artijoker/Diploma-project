import { Component, OnInit } from '@angular/core';
import {Post} from "../../../model/Post";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {ComparePosts} from "../../../comparePosts";

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
                public _postService: PostService) {
        this.categoryId = this._activateRoute.snapshot.params['category-id'];
    }

    ngOnInit(): void {
        this._postService.getPostsByCategoryId(this.categoryId)
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
