import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostService} from 'src/app/services/post/post.service';
import {AuthorizationCheckService} from 'src/app/services/data/authorization-check.service';
import {CategoryService} from 'src/app/services/category/category.service';
import {Category} from "../../../models/Category";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryModalWindowComponent} from "../../modal-windows/category/category-modal-window.component";
import JWTDecode from "jwt-decode";

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories-page.component.html',
    styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

    categories: Category[] = [];
    isCategoriesLoadComplete: boolean = false;

    constructor(
        private _router: Router,
        private _categoryService: CategoryService,
        private _postService: PostService,
        private _modalService: NgbModal,
        private _authorizationCheckService: AuthorizationCheckService) {
    }

    ngOnInit(): void {
        if (!this._authorizationCheckService.isAdministratorLoggedIn())
            this._router.navigate(
                ['sing-in']
            );
        this.getCategories();
    }

    getCategories() {
        this._categoryService.getCategories()
            .subscribe(response => {
                if (response.succeeded) {
                    this.categories = response.result;
                    this.isCategoriesLoadComplete = true;
                } else {
                    alert(response.message);
                }
            })
    }

    addCategory() {
        let modalRef = this._modalService.open(CategoryModalWindowComponent,
            {size: "lg"});
        modalRef.result.then(
            result => {
                if (result !== undefined) {
                    this.isCategoriesLoadComplete = false;
                    this._categoryService.addNewCategory(result)
                        .subscribe(response => {
                            if (response.succeeded) {
                                this.getCategories();
                            } else {
                                alert(response.message);
                            }
                        })
                }
            }).catch(reason => {
        });
    }

    editCategory(category: Category, event: Event) {
        event.stopPropagation();

        let modalRef = this._modalService.open(CategoryModalWindowComponent,
            {size: "lg"});
        modalRef.componentInstance.currentCategoryName = category.name;
        modalRef.result.then(
            result => {
                if (result !== undefined) {

                    if (category.name !== result){
                        this._categoryService.editCategory(category.id, result).subscribe(
                            response => {
                                if (response.succeeded) {
                                    let index = this.categories.findIndex(c => c.id == category.id);
                                    category.name = result;
                                    this.categories[index] = category;
                                } else {
                                    alert(response.message);
                                }
                            }
                        )
                    }

                }
            }).catch(reason => {
        });
        this._categoryService.getCategories()
            .subscribe(response => {
                console.dir(response);
                if (response.succeeded) {
                    this.categories = response.result;
                } else {
                    alert(response.message);
                }
            })
    }

    deleteCategory(category: Category, event: Event) {
        event.stopPropagation();
        this._categoryService.deleteCategory(category.id)
            .subscribe(response => {
                if (response.succeeded) {
                    this.categories = this.categories.filter(c => c.id !== category.id);
                } else {
                    alert(response.message);
                }
            })
    }


    goToPostsByCategoryId(categoryId: number) {
        this._router.navigate(
            ['posts-by-category', categoryId]
        );
    }


    sortName() {
        this.categories.sort((a, b) => {
            if (a.name < b.name)
                return 1;
            if (a.name > b.name)
                return -1;
            return 0;
        });
    }

    sortQuantityPosts() {
        this.categories.sort((a, b) => {
            if (a.quantityPublishedPosts < b.quantityPublishedPosts)
                return 1;
            if (a.quantityPublishedPosts > b.quantityPublishedPosts)
                return -1;
            return 0;
        });
    }
}
