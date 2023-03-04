import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-edit-comment',
    templateUrl: './edit-comment.component.html',
    styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
    @Input() currentTextComment = "";
    newTextComment: string = "";

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.newTextComment = this.currentTextComment;
    }

    save() {
        if (this.newTextComment !== "")
            this.activeModal.close(this.newTextComment);
        else
            alert("Введите текст комментария");
    }
}
