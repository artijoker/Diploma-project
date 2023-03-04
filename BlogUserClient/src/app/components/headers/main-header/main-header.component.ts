import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogInService} from "../../../services/login/log-in.service";
import {DataService} from "../../../services/data/data.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {AddComplaintComponent} from "../../modal-windows/add-complaint/add-complaint.component";
import {SearchComponent} from "../../modal-windows/search/search.component";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

    isAuthorized: boolean;

    constructor(private _router: Router,
                private _logInService: LogInService,
                private _modalService: NgbModal) {
        this.isAuthorized = false;

    }

    ngOnInit(): void {
        if (localStorage.getItem("token"))
            this.isAuthorized = true;
    }

    singUp() {
        this._router.navigate(
            ['/sing-up']
        );
    }

    singIn() {
        this._router.navigate(
            ['/sing-in']
        );
    }

    addPost() {
        this._router.navigate(
            ['/add-post']
        );
    }

    myProfile() {
        this._router.navigate(
            ['/my-profile']
        );
    }

    myPosts() {
        this._router.navigate(
            ['/my-posts']
        );
    }

    exit() {
        localStorage.clear();
        this.isAuthorized = false;
        this._router.navigate(
            ['/blog']
        );
    }

    search(){
        this._modalService.open(SearchComponent, {size: "lg"});
    }

}
