import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommentService} from "../../../services/comment/comment.service";
import {Comment} from "../../../models/Comment"
import {CommentModalWindowComponent} from "../../modal-windows/comment/comment-modal-window.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostModalWindowComponent} from "../../modal-windows/post/post-modal-window.component";
import {AuthorizationCheckService} from "../../../services/data/authorization-check.service";

@Component({
    selector: 'app-comments-page',
    templateUrl: './comments-page.component.html',
    styleUrls: ['./comments-page.component.css']
})
export class CommentsPageComponent implements OnInit {

    comments: Comment[] = [];
    isCommentsLoadComplete: boolean = false;

    constructor(private _router: Router,
                private _commentService: CommentService,
                private _modalService: NgbModal,
                private _authorizationCheckService: AuthorizationCheckService) {
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );
        this.loadComments();
    }

    loadComments(){
        this._commentService.getAllComments().subscribe(
            response => {
                if (response.succeeded) {
                    this.comments = response.result;
                    this.isCommentsLoadComplete = true;
                } else {
                    alert("Ошибка! Не удалось загрузить комментарии");
                }
            }
        );
    }

    openPost(postId: number) {
        let modalRef = this._modalService
            .open(PostModalWindowComponent, {size: "xl"});
        modalRef.componentInstance.postId = postId;

    }

    openComment(comment: Comment) {
        let modalRef = this._modalService
            .open(CommentModalWindowComponent, {size: "ls"});
        modalRef.componentInstance.comment = comment;
        modalRef.result.then(
            result => {
                if (result === true){
                    this.isCommentsLoadComplete = true;
                    this.loadComments();
                }
            }
        ).catch(reason => {
        });
    }

    sortAuthor() {
        this.comments.sort((a, b) => {
            if (a.accountNickname > b.accountNickname)
                return 1;
            if (a.accountNickname < b.accountNickname)
                return -1;
            return 0;
        });
    }

    sortComment() {
        this.comments.sort((a, b) => {
            if (a.text > b.text)
                return 1;
            if (a.text < b.text)
                return -1;
            return 0;
        });
    }

    sortPostTitle() {
        this.comments.sort((a, b) => {
            if (a.postTitle > b.postTitle)
                return 1;
            if (a.postTitle < b.postTitle)
                return -1;
            return 0;
        });
    }

    sortDate() {
        this.comments.sort((a, b) => {
            if (a.created < b.created)
                return 1;
            if (a.created > b.created)
                return -1;
            return 0;
        });
    }

    sortIsDelete() {
        this.comments.sort((a, b) => {
            if (a.isDeleted > b.isDeleted)
                return 1;
            if (a.isDeleted < b.isDeleted)
                return -1;
            return 0;
        });
    }

}
