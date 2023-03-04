import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {PostComponent} from './components/post/post.component';
import {PostDetailsPageComponent} from './components/pages/post-details-page/post-details-page.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PostsComponent} from './components/posts/posts.component';

import {SingInPageComponent} from './components/pages/sing-in-page/sing-in-page.component';
import {PublicationsPageComponent} from './components/pages/publications-page/publications-page.component';
import {AccountsPageComponent} from './components/pages/accounts-page/accounts-page.component';
import {CategoriesPageComponent} from './components/pages/categories-page/categories-page.component';
import {PostEditorPageComponent} from './components/pages/post-editor-page/post-editor-page.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';

import {CategoryModalWindowComponent} from './components/modal-windows/category/category-modal-window.component';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MainHeaderComponent } from './components/headers/main-header/main-header.component';
import { SearchModalWindowComponent } from './components/modal-windows/search/search-modal-window.component';
import { ProfilePostsHeaderComponent } from './components/headers/profile-posts-header/profile-posts-header.component';
import { ProfileHeaderComponent } from './components/headers/profile-header/profile-header.component';
import { ComplaintsOnPostsPageComponent } from './components/pages/complaints-on-posts-page/complaints-on-posts-page.component';
import { ComplaintsOnCommentsPageComponent } from './components/pages/complaints-on-comments-page/complaints-on-comments-page.component';
import { PostModalWindowComponent } from './components/modal-windows/post/post-modal-window.component';
import { CommentModalWindowComponent } from './components/modal-windows/comment/comment-modal-window.component';
import { ComplaintsHeaderComponent } from './components/headers/complaints-header/complaints-header.component';
import { AddEditAccountModalWindowComponent } from './components/modal-windows/add-edit-account/add-edit-account-modal-window.component';
import { AddEditPostPageComponent } from './components/pages/add-edit-post-page/add-edit-post-page.component';
import { CommentsPageComponent } from './components/pages/comments-page/comments-page.component';
import { PostsByAccountPageComponent } from './components/pages/posts-by-account-page/posts-by-account-page.component';
import { PostsByCategoryPageComponent } from './components/pages/posts-by-category-page/posts-by-category-page.component';
registerLocaleData(localeRu, 'ru');

@NgModule({
    declarations: [
        AppComponent,
        PostComponent,
        PostDetailsPageComponent,
        PostEditorPageComponent,
        PublicationsPageComponent,
        SingInPageComponent,
        AccountsPageComponent,
        PostsComponent,
        CategoriesPageComponent,
        SafeHtmlPipe,
        CategoryModalWindowComponent,
        MainHeaderComponent,
        SearchModalWindowComponent,
        ProfilePostsHeaderComponent,
        ProfileHeaderComponent,
        ComplaintsOnPostsPageComponent,
        ComplaintsOnCommentsPageComponent,
        PostModalWindowComponent,
        CommentModalWindowComponent,
        ComplaintsHeaderComponent,
        AddEditAccountModalWindowComponent,
        AddEditPostPageComponent,
        CommentsPageComponent,
        PostsByAccountPageComponent,
        PostsByCategoryPageComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        AngularEditorModule,

    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'ru'},
        {provide: 'HOST_URL', useValue: "https://localhost:7299/"}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
