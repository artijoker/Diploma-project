import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Post} from "../../../models/Post";

@Component({
  selector: 'app-search',
  templateUrl: './search-modal-window.component.html',
  styleUrls: ['./search-modal-window.component.css']
})
export class SearchModalWindowComponent implements OnInit {

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
