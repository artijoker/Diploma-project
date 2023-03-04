import {Component, OnInit} from '@angular/core';
import {Comment} from "../../../../model/Comment";
import {CommentService} from "../../../../services/comment/comment.service";
import {Router} from "@angular/router";
import {EditCommentComponent} from "../../../modal-windows/edit-comment/edit-comment.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-profile-pages-comments-page',
    templateUrl: './profile-comments-page.component.html',
    styleUrls: ['./profile-comments-page.component.css']
})
export class ProfileCommentsPageComponent implements OnInit {

    comments: Comment[] = [];
    isCommentsLoadComplete: boolean = false;

    constructor(private _router: Router,
                private _modalService: NgbModal,
                private _commentService: CommentService) {
    }

    ngOnInit(): void {
        this._commentService.getCommentsByAccount().subscribe(
            response => {
                if (response.succeeded){
                    this.comments = response.result;
                    this.isCommentsLoadComplete = true;
                }
                else {
                    alert(response.message);
                }
            }
        );
    }

    goToPost(postId: number){
        this._router.navigate(
            ['post', postId]
        );
    }

    editComment(comment: Comment) {
        let modalRef = this._modalService.open(EditCommentComponent,{size: "lg"});
        modalRef.componentInstance.currentTextComment = comment.text;

        modalRef.result.then(
            result => {
                if (result !== undefined){
                    if (comment.text !== result) {
                        this._commentService.updateComment(result, comment.id)
                            .subscribe(response => {
                                    if (response.succeeded) {
                                        comment.text = result;
                                    } else {
                                        alert(response.message);
                                    }
                                }
                            );
                    }
                }
            }).catch(reason => {}
        );
    }

    deleteComment(comment: Comment) {
        this._commentService.removeComment(comment.id)
            .subscribe(response => {
                    if (response.succeeded) {
                        this.comments = this.comments.filter(c => c.id != comment.id);
                    } else {
                        alert(response.message);
                    }
                }
            );
    }
}
