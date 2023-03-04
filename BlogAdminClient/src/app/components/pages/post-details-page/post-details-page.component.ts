import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from 'src/app/models/Post';
import {PostService} from 'src/app/services/post/post.service';
import {AccountService} from "../../../services/account/account.service";
import {Location} from '@angular/common';
import {PostStatus} from "../../../PostStatus";
import {AuthorizationCheckService} from "../../../services/data/authorization-check.service";

@Component({
    selector: 'app-post-page',
    templateUrl: './post-details-page.component.html',
    styleUrls: ['./post-details-page.component.css']
})
export class PostDetailsPageComponent implements OnInit {

    post?: Post;
    id: number;
    status?: PostStatus;
    postStatus: typeof PostStatus = PostStatus;

    date:string = "";
    constructor(private _activateRoute: ActivatedRoute,
                private _router: Router,
                private _location: Location,
                private _postService: PostService,
                private _accountService: AccountService,
                private _authorizationCheckService: AuthorizationCheckService) {
        this.id = this._activateRoute.snapshot.params['post-id'];
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );

        this._postService.getPostById(this.id)
            .subscribe(response => {
                if (response.succeeded) {
                    this.post = response.result;
                    this.status = this.post.status as PostStatus;
                    this.date =  this.post?.lastChange.toLocaleString("ru")
                } else {
                    alert(response.message);
                }
            })

    }

    goToPostsByAccountId() {
        if (this.post !== undefined) {
            this._router.navigate(
                ['posts-by-account', this.post?.authorId]
            );
        }

    }

    goToPostEditor() {
        if (this.post !== undefined) {
            this._router.navigate(
                ['edit-post', this.post?.id]
            );
        }
    }

    setPostStatusRejected(message:string) {
        if (this.post !== undefined) {
            this._postService.setPostStatusRejected(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert(message);
                        //alert("Пост отклонен");
                        this._router.navigate(['publications']);
                    } else {
                        alert(response.message);
                    }
                })
        }

    }

    setPostStatusPublished() {
        if (this.post !== undefined) {
            this._postService.setPostStatusPublished(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Пост опубликован");
                        this._router.navigate(['publications']);
                    } else {
                        alert(response.message);
                    }
                })
        }
    }

    postSendToTrash() {
        if (this.post !== undefined) {
            this._postService.postSendToTrashById(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Пост отправлен в корзину");
                        this._router.navigate(['publications']);
                    } else {
                        alert(response.message);
                    }
                })
        }
    }
}
