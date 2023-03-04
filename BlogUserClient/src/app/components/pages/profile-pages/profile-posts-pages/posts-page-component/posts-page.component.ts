import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../../../model/Post";
import {PostService} from "../../../../../services/post/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts-page-component',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

    @Input() posts?: Post[] = [];
    @Input() goToPost?:(postId: number) => void;
    @Input() editPost?:(postId: number) => void;
    @Input() sendPostToDraft?:(postId: number) => void;
    @Input() sendPostToTrash?:(postId: number) => void;
    @Input() publishPost?:(postId: number) => void;
    @Input() restorePostById?:(postId: number) => void;
    @Input() deletePostById?:(postId: number) => void;

    constructor(protected _postService: PostService,
                protected _router: Router) {
    }

    ngOnInit(): void {
        //console.dir(this.posts);
    }
}
