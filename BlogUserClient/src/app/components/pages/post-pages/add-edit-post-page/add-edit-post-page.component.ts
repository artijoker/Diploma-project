import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../../services/post/post.service";
import {Category} from "../../../../model/Category";
import {CategoryService} from "../../../../services/category/category.service";
import {Location} from "@angular/common";
import {Post} from "../../../../model/Post";
import {Observable, Subscriber} from "rxjs";

@Component({
    selector: 'app-add-edit-post-page',
    templateUrl: './add-edit-post-page.component.html',
    styleUrls: ['./add-edit-post-page.component.css']
})
export class AddEditPostPageComponent implements OnInit {


    title: string = "";
    anons: string = "";
    htmlContent: string = "";
    categories: Category[] = [];
    selectedCategory?: Category;

    post?: Post;
    postId: number;
    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        sanitize: false,
        translate: 'yes',
        height: "30rem",
        minHeight: "20rem",
        minWidth: "600px",
        width: window.innerWidth - 200 + "px",
        placeholder: "Введите текст здесь...",
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [['insertImage', 'insertVideo', 'customClasses', 'toggleEditorMode']]
    };
    isPostLoadComplete: boolean = false;
    isSavingInProgress: boolean = false;


    constructor(private _activateRoute: ActivatedRoute,
                private _location: Location,
                private _router: Router,
                private _postService: PostService,
                private _categoryService: CategoryService) {
        this.postId = this._activateRoute.snapshot.params['post-id'];
    }

    ngOnInit(): void {
        if (this.postId === undefined) {
            this.isPostLoadComplete = true;
            this._categoryService.getCategories()
                .subscribe(response => {
                    if (response.succeeded) {
                        this.categories = response.result;
                    } else {
                        alert(response.message);
                    }
                });
        } else {
            this._postService.getPostById(this.postId)
                .subscribe(response => {
                    if (response.succeeded) {
                        this.post = response.result
                        this.title = this.post.title;
                        this.anons = this.post.anons;
                        this.htmlContent = this.post.fullText;
                        this._categoryService.getCategories()
                            .subscribe(response => {
                                if (response.succeeded) {
                                    this.categories = response.result;
                                    this.selectedCategory =
                                        this.categories.filter(c => c.id === this.post?.categoryId)[0];
                                    this.isPostLoadComplete = true;
                                } else {
                                    alert(response.message);
                                }
                            });
                    } else {
                        alert(response.message);
                    }
                })
        }
    }

    @HostListener('document:keydown.tab', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        if (this.isSavingInProgress)
            event.preventDefault();
    }

    onInputClick(event: Event) {
        alert("Разрешение изображения не должно превышать 2560x2560 пикселей.");
        const element = event.target as HTMLInputElement
        element.value = ''
    }

    tab(event: KeyboardEvent){
        // if (event.key === "Tab"){
        //     document.execCommand('indent');
        //     let editor = document.getElementById("editor");
        //     console.dir(editor);
        //     if (editor !== null)
        //         editor.focus();
        // }

    }

    insertImage($event: Event) {
        let file: File = (($event.target as HTMLInputElement).files as FileList)[0];

        if (!file.type.includes("image/"))
            return;

        let image = new Image();
        image.src = URL.createObjectURL(file);
        //$event.preventDefault();
        image.onload = () => {
            if (image.naturalWidth > 2560 || image.naturalHeight > 2560) {
                alert("Разрешение изображения превышает допустимый размер!");
                return;
            }
            this.convertToBase64(file);
        }
    };

    convertToBase64(file: File) {
        let observable = new Observable((subscriber: Subscriber<any>) => {
            this.readFile(file, subscriber);
        });
        observable.subscribe((result: string | ArrayBuffer | null) => {
            if (result !== null) {
                let base64code: string = result as string;
                document.execCommand(
                    'insertHTML',
                    false,
                    '<img style="max-width:100%; object-fit: contain;" src="' + base64code + '" alt="">'
                );

                document.execCommand('insertParagraph');

            }
        });
    }

    readFile(file: File, subscriber: Subscriber<string | ArrayBuffer | null>) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            subscriber.next(fileReader.result);
            subscriber.complete();
        };
        fileReader.onerror = (error) => {
            subscriber.error(error);
            subscriber.complete();
        };
    }

    onChange(category: Category) {
        this.selectedCategory = category;
    }

    isValid() {
        return this.title != "" && this.anons != "" && this.selectedCategory && this.htmlContent !== "";
    }

    showInvalidField() {
        if (this.title === "")
            alert("Текст заголовок не указан");
        else if (this.anons === "")
            alert("Текст анонса не указан");
        else if (!this.selectedCategory)
            alert("Выберите категорию");
        else if (this.htmlContent === "")
            alert("Текст поста не указан");
    }

    save() {
        if (this.isValid()) {
            if (this.post !== undefined) {
                this.isSavingInProgress = true;
                this.htmlContent = '<div style="word-wrap: break-word">'+ this.htmlContent +'</div>';
                this._postService.updatePost(this.post?.id,
                    this.title,
                    this.anons,
                    this.htmlContent,
                    this.selectedCategory!.id)
                    .subscribe(response => {
                        if (response.succeeded) {
                            alert("Пост сохранен");
                            this._location.back();
                        } else {
                            alert(response.message);
                        }
                    });
            }
        } else {
            this.showInvalidField();
        }
    }


    cancel() {
        this._location.back();
    }

    addPost() {
        if (this.isValid()) {
            this.isSavingInProgress = true;
            this.htmlContent = '<div style="word-wrap: break-word">'+ this.htmlContent +'</div>';
            this._postService.addPost(this.title,
                this.anons,
                this.htmlContent,
                this.selectedCategory!.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Пост сохранен в черновиках");
                        this._router.navigate(
                            ['/blog']
                        );
                    } else {
                        alert(response.message);
                    }
                });
        } else {
            this.showInvalidField()
        }
    }

    addPostWithStatusPending() {
        if (this.isValid()) {
            this.isSavingInProgress = true;
            this.htmlContent = '<div style="word-wrap: break-word">'+ this.htmlContent +'</div>';
            this._postService.addPostWithStatusPending(this.title,
                this.anons,
                this.htmlContent,
                this.selectedCategory!.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Пост сохранен и отправлена на проверку модераторам");
                        this._router.navigate(
                            ['/blog']
                        );
                    } else {
                        alert(response.message);
                    }
                });
        } else {
            this.showInvalidField()
        }
    }

}
