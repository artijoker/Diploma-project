import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/Post";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { PostStatus } from 'src/app/PostStatus';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {PostService} from "../../../services/post/post.service";

@Component({
    selector: 'app-post',
    templateUrl: './post-modal-window.component.html',
    styleUrls: ['./post-modal-window.component.css']
})
export class PostModalWindowComponent implements OnInit {

    @Input() postId?: number;
    post?: Post;
    status?: PostStatus;
    public readonly postStatus: typeof PostStatus = PostStatus;
    isLoadPostComplete: boolean = false;

    constructor(public activeModal: NgbActiveModal,
                private _router: Router,
                private _postService: PostService) {
    }

    ngOnInit(): void {
        if (this.postId !== undefined){
            this._postService.getPostById(this.postId)
                .subscribe(
                    response => {
                        if (response.succeeded){
                            this.post = response.result;
                            this.isLoadPostComplete = true;
                        }
                        else{
                            alert(response.message);
                        }
                    }
                );
        }

    }

    goToPostEditor() {
        if (this.post !== undefined) {
            this.activeModal.close();
            this._router.navigate(
                ['edit-post', this.post?.id]
            );
        }
    }

    setPostStatusRejected(){
        if (this.post !== undefined) {
            this._postService.setPostStatusRejected(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Пост снят с публикации");
                        this.activeModal.close();
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
                        this.activeModal.close();
                    } else {
                        alert(response.message);
                    }
                })
        }
    }
}
