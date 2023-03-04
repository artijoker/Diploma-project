import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { PostService } from 'src/app/services/post/post.service';
import { DataService } from 'src/app/services/data/data.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
	selector: 'app-categories-page',
	templateUrl: './categories-page.component.html',
	styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

	categories: Category[] = [];



	constructor(
		private _router: Router,
		private _categoryService: CategoryService,
		private _postService: PostService,
		private _dataService: DataService) {
	}

	ngOnInit(): void {
		this.getCategories();
	}

	getCategories() {
        this._categoryService.getCategories()
            .subscribe(response => {
                if (response.succeeded) {
                    let categories = response.result;
                    [categories[0], categories[categories.length - 1]] = [categories[categories.length - 1], categories[0]];
                    this.categories = categories;
                }
                else {
                    alert(response.message);
                }
            })
    }


	goToPostsByCategory(category: Category) {
        this._router.navigate(['categories/posts-by-category', category.id]);
	}

}
