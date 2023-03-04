import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Post} from 'src/app/models/Post';
import {AuthorizationCheckService} from 'src/app/services/data/authorization-check.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    @Input() posts: Post[] = [];

    constructor(private _router: Router) {
    }

    ngOnInit(): void {
        this.posts.sort((a, b) => {
            if (a.lastChange < b.lastChange)
                return 1;
            if (a.lastChange > b.lastChange)
                return -1;
            return 0;
        });
    }

    goToPost(postId: number) {
        this._router.navigate(
            ['post', postId]
        );
    }

    goToPostEditor(postId: number) {
        this._router.navigate(
            ['edit-post', postId]
        );
    }

    sortTitle() {
        this.posts.sort((a, b) => {
            if (a.title > b.title)
                return 1;
            if (a.title < b.title)
                return -1;
            return 0;
        });
    }

    sortAuthor() {
        this.posts.sort((a, b) => {
            if (a.authorNickname > b.authorNickname)
                return 1;
            if (a.authorNickname < b.authorNickname)
                return -1;
            return 0;
        });
    }

    sortCategory() {
        this.posts.sort((a, b) => {
            if (a.categoryName > b.categoryName)
                return 1;
            if (a.categoryName < b.categoryName)
                return -1;
            return 0;
        });
    }

    sortDate() {
        this.posts.sort((a, b) => {
            if (a.lastChange < b.lastChange)
                return 1;
            if (a.lastChange > b.lastChange)
                return -1;
            return 0;
        });
    }
}
