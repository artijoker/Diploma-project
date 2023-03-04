import { Component, OnInit } from '@angular/core';
import {SearchModalWindowComponent} from "../../modal-windows/search/search-modal-window.component";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

    constructor(private _router: Router,
                private _modalService: NgbModal) {
    }

    ngOnInit(): void {
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
        this._router.navigate(
            ['/sing-in']
        );
    }

    search(){
        this._modalService.open(SearchModalWindowComponent, {size: "lg"});
    }
}
