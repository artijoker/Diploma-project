import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/model/Category';
import {Post} from "../../../model/Post";
import {ComparePosts} from "../../../comparePosts";
@Component({
    selector: 'app-blog',
    templateUrl: './blog-page.component.html',
    styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

    isPostsLoadComplete: boolean = false;
    categories: Category[] = [];
    posts: Post[] = [];
    linkNumber: number = 0;

    constructor(private _postService: PostService,
        private _categoryService: CategoryService) { }

    ngOnInit(): void {
        this.getCategories();
        this.getPosts();

    }

    toggle(newLinkNumber: number) {
        this.linkNumber = newLinkNumber;
    }

    getCategories() {
        this._categoryService.getCategories()
            .subscribe(response => {
                if (response.succeeded) {
                    let categories = response.result;
                    [categories[0], categories[categories.length - 1]] = [categories[categories.length - 1], categories[0]];
                    this.categories = categories;
                }
                else {
                    alert(response.message);
                }
            })
    }

    getPosts() {
        this._postService.getPosts()
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

    getPostsByCategory(category: Category) {
        this.isPostsLoadComplete = false;
        this._postService.getPostsByCategoryId(category.id)
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


