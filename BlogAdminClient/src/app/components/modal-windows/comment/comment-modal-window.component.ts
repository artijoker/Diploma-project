import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Comment} from "../../../models/Comment";
import {CommentService} from "../../../services/comment/comment.service";

@Component({
    selector: 'app-comment',
    templateUrl: './comment-modal-window.component.html',
    styleUrls: ['./comment-modal-window.component.css']
})
export class CommentModalWindowComponent implements OnInit {

    @Input() comment?: Comment;
    isEditMode: boolean = false;
    newTextComment: string = "";

    constructor(public activeModal: NgbActiveModal,
                private _commentService: CommentService) {
    }

    ngOnInit(): void {
    }

    editComment() {
        if (this.comment !== undefined) {
            this.isEditMode = true;
            this.newTextComment = this.comment.text;
        }
    }

    save() {
        if (this.newTextComment === "") {
            alert("Введите текст комментария");
            return;
        }

        if (this.comment !== undefined) {
            if (this.comment.text !== this.newTextComment) {
                this._commentService.updateComment(this.newTextComment, this.comment.id).subscribe(
                    response => {
                        if (response.succeeded) {
                            if (this.comment !== undefined)
                                this.comment.text = this.newTextComment;
                            this.isEditMode = false;
                            alert("Комментарий сохранен");
                            this.activeModal.close(true);
                        } else {
                            alert(response.message);
                        }
                    }
                );
            }
        }
    }

    delete() {
        if (this.comment !== undefined) {
            this._commentService.removeComment(this.comment.id)
                .subscribe(
                    response => {
                        if (response.succeeded) {
                            alert("Комментарий удален");
                            this.activeModal.close(true);
                        } else {
                            alert(response.message);
                        }
                    }
                );

        }
    }
}
