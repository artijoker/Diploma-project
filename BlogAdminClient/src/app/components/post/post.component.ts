import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';

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
            [this._router.url + '/post', this.post?.id]
        );
    }
}
