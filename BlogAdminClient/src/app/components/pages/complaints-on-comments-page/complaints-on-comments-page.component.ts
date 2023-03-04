import {Component, OnInit} from '@angular/core';
import {ComplaintPost} from "../../../models/ComplaintPost";
import {ComplaintService} from "../../../services/complaint/complaint.service";
import {PostService} from "../../../services/post/post.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostModalWindowComponent} from "../../modal-windows/post/post-modal-window.component";
import {CommentService} from "../../../services/comment/comment.service";
import {ComplaintComment} from "../../../models/ComplaintComment";
import {
    CommentModalWindowComponent
} from "../../modal-windows/comment/comment-modal-window.component";
import {Router} from "@angular/router";
import {AuthorizationCheckService} from "../../../services/data/authorization-check.service";

@Component({
    selector: 'app-complaints-on-comments-page',
    templateUrl: './complaints-on-comments-page.component.html',
    styleUrls: ['./complaints-on-comments-page.component.css']
})
export class ComplaintsOnCommentsPageComponent implements OnInit {

    isComplaintsLoadComplete: boolean = false;
    complaints: ComplaintComment[] = [];

    constructor(private _complaintService: ComplaintService,
                private _commentService: CommentService,
                private _modalService: NgbModal,
                private _router: Router,
                private _authorizationCheckService: AuthorizationCheckService) {
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );

        this._complaintService.getAllComplaintsOnComment().subscribe(
            response => {
                if (response.succeeded) {
                    this.complaints = response.result;
                    this.isComplaintsLoadComplete = true;
                } else {
                    alert(response.message);
                }
            }
        );
    }

    openComment(commentId: number) {
        let modalRef = this._modalService
            .open(CommentModalWindowComponent, {size: "ls"});
        this._commentService.getCommentById(commentId)
            .subscribe(
                response => {
                    if (response.succeeded) {
                        modalRef.componentInstance.comment = response.result;
                    } else {
                        alert(response.message);
                    }
                }
            );


    }

    complaintProcessed(complaintId: number) {
        this._complaintService.removeComplaintOnCommentById(complaintId)
            .subscribe(
                response => {
                    if (response.succeeded) {
                        this.complaints = this.complaints.filter(c => c.id !== complaintId);
                    } else {
                        alert(response.message);
                    }
                }
            );
    }

    sortAuthor() {
        this.complaints.sort((a, b) => {
            if (a.accountNickname > b.accountNickname)
                return 1;
            if (a.accountNickname < b.accountNickname)
                return -1;
            return 0;
        });
    }

    sortDate() {
        this.complaints.sort((a, b) => {
            if (a.created < b.created)
                return 1;
            if (a.created > b.created)
                return -1;
            return 0;
        });
    }
}
