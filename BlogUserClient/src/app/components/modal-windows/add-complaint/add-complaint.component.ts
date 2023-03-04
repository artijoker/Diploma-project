import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ComplaintService} from "../../../services/complaint/complaint.service";

@Component({
    selector: 'app-add-complaint',
    templateUrl: './add-complaint.component.html',
    styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
    textComplaint: string = "";

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    send(){
        if (this.textComplaint !== "")
            this.activeModal.close(this.textComplaint);
        else
            alert("Укажите причину жалобы");
    }
}
