import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Post} from "../../../model/Post";
import {PostService} from "../../../services/post/post.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    isSearch: boolean = false;
    isSearchCompleted: boolean = false;
    textSearch: string = "";
    posts: Post[] = [];

    constructor(private _router: Router,
                public activeModal: NgbActiveModal,
                private _postService: PostService) {
    }

    ngOnInit(): void {
    }

    searchByPosts() {
        this.textSearch = this.textSearch.trim();
        if (this.textSearch === "")
            return;

        this.isSearch = true;
        this._postService.findPostsBySubstring(this.textSearch)
            .subscribe(
                response => {
                    if (response.succeeded) {
                        this.isSearchCompleted = true;
                        this.posts = response.result;
                    } else {
                        alert(response.message);
                    }
                }
            );
    }

    goToPost(postId: number){
        this.activeModal.close();
        this._router.navigate(
            ['post', postId]
        );
    }
}
