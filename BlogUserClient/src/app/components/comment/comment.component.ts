import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../model/Post";
import {Comment} from "../../model/Comment";
import jwt_decode from "jwt-decode";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditCommentComponent} from "../modal-windows/edit-comment/edit-comment.component";
import {ComplaintService} from "../../services/complaint/complaint.service";
import {AddComplaintComponent} from "../modal-windows/add-complaint/add-complaint.component";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    @Input() comment?: Comment;
    @Output() edit: EventEmitter<string> = new EventEmitter<string>();
    @Output() delete: EventEmitter<object> = new EventEmitter<object>();
    @Output() complaint: EventEmitter<string> = new EventEmitter<string>();
    isAuthorized: boolean = false;
    isMyComment: boolean = false;

    constructor(private _complaintService: ComplaintService,
                private _modalService: NgbModal,
                ) {
    }

    ngOnInit(): void {
        let token = localStorage.getItem("token");
        if (token !== null) {
            this.isAuthorized = true;
            let tokenDecode: { nameid: string } = jwt_decode(token);
            this.isMyComment = this.comment?.accountId.toString() === tokenDecode.nameid;
        }
    }

    editComment() {
        let modalRef = this._modalService.open(EditCommentComponent,{size: "lg"});
        modalRef.componentInstance.currentTextComment = this.comment?.text;
        modalRef.result.then(
            result => {
                if (result !== undefined){
                    this.edit.emit(result);
                }
            }).catch(reason => {}
        );
    }

    addComplaint(){
        let modalRef = this._modalService.open(AddComplaintComponent,{size: "lg"});
        modalRef.result.then(
            result => {
                if (result !== undefined) {
                    this.complaint.emit(result);
                }
            }).catch(reason => {}
        );
    }
}
