import {Component, OnInit} from '@angular/core';
import {ComplaintService} from "../../../services/complaint/complaint.service";
import {Post} from "../../../models/Post";
import {ComplaintPost} from "../../../models/ComplaintPost";
import {PostService} from "../../../services/post/post.service";
import {SearchModalWindowComponent} from "../../modal-windows/search/search-modal-window.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostModalWindowComponent} from "../../modal-windows/post/post-modal-window.component";
import {AuthorizationCheckService} from "../../../services/data/authorization-check.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-complaints-on-posts-page',
    templateUrl: './complaints-on-posts-page.component.html',
    styleUrls: ['./complaints-on-posts-page.component.css']
})
export class ComplaintsOnPostsPageComponent implements OnInit {

    isComplaintsLoadComplete: boolean = false;
    complaints: ComplaintPost[] = [];

    constructor(private _complaintService: ComplaintService,
                private _postService: PostService,
                private _modalService: NgbModal,
                private _router: Router,
                private _authorizationCheckService: AuthorizationCheckService) {
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );

        this._complaintService.getAllComplaintsOnPosts().subscribe(
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
    complaintProcessed(complaintId: number) {
        this._complaintService.removeComplaintOnPostById(complaintId)
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
    openPost(postId:number){
        let  modalRef = this._modalService
            .open(PostModalWindowComponent, {size: "xl"});
        modalRef.componentInstance.postId = postId;

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
