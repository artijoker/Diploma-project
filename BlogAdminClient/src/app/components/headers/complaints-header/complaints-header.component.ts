import {Component, OnInit} from '@angular/core';
import {ComplaintService} from "../../../services/complaint/complaint.service";

@Component({
    selector: 'app-complaints-header',
    templateUrl: './complaints-header.component.html',
    styleUrls: ['./complaints-header.component.css']
})
export class ComplaintsHeaderComponent implements OnInit {


    constructor(private _complaintService: ComplaintService) {
    }


    ngOnInit(): void {

    }

}
