import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import {DataService} from "../../services/data/data.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	@Input() post?: Post

	constructor(private _router: Router) {
	}

	ngOnInit(): void {
	}

	goToPost(){

        this._router.navigate(
            ['post', this.post?.id]
        );
    }
}
