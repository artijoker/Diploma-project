import {InjectionToken, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';

import {PostComponent} from './components/post/post.component';
import {PostDetailsPageComponent} from './components/pages/post-pages/post-details-page/post-details-page.component';

import {AccountEditorPageComponent} from './components/pages/profile-pages/account-editor-page/account-editor-page.component';
import {AuthorComponent} from './components/author/author.component';

import {BlogPageComponent} from './components/pages/blog-page/blog-page.component';
import {AuthorsPageComponent} from './components/pages/authors-page/authors-page.component';
import {CategoriesPageComponent} from './components/pages/categories-page/categories-page.component';

import {SingInPageComponent} from './components/pages/sing-in-page/sing-in-page.component';
import {SingUpPageComponent} from './components/pages/sing-up-page/sing-up-page.component';
import {ProfilePageComponent} from './components/pages/profile-pages/profile-page/profile-page.component';
import {AddEditPostPageComponent} from './components/pages/post-pages/add-edit-post-page/add-edit-post-page.component';

import {RejectedPostsPageComponent} from "./components/pages/profile-pages/profile-posts-pages/rejected-posts-page/rejected-posts-page.component";
import {PublishedPostsPageComponent} from "./components/pages/profile-pages/profile-posts-pages/published-posts-page/published-posts-page.component";
import {DraftPostsPageComponent} from "./components/pages/profile-pages/profile-posts-pages/draft-posts-page/draft-posts-page.component";
import {PendingPostsPageComponent} from './components/pages/profile-pages/profile-posts-pages/pending-posts-page/pending-posts-page.component';

import {SafeHtmlPipe} from './pipes/safe-html.pipe';

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MainHeaderComponent } from './components/headers/main-header/main-header.component';
import { CommentComponent } from './components/comment/comment.component';
import { EditCommentComponent } from './components/modal-windows/edit-comment/edit-comment.component';
import { PostsByAuthorPageComponent } from './components/pages/posts-by-author-page/posts-by-author-page.component';
import { PostsByCategoryPageComponent } from './components/pages/posts-by-category-page/posts-by-category-page.component';
import { AddComplaintComponent } from './components/modal-windows/add-complaint/add-complaint.component';
import { ProfileCommentsPageComponent } from './components/pages/profile-pages/profile-comments-page/profile-comments-page.component';
import { ProfileSubscriptionsPageComponent } from './components/pages/profile-pages/profile-subscriptions-page/profile-subscriptions-page.component';
import { ProfileLikedPostsPageComponent } from './components/pages/profile-pages/profile-liked-posts-page/profile-liked-posts-page.component';
import { SearchComponent } from './components/modal-windows/search/search.component';
import { ProfileHeaderComponent } from './components/headers/profile-header/profile-header.component';
import { ProfilePostsHeaderComponent } from './components/headers/profile-posts-header/profile-posts-header.component';
import { PostsPageComponent } from './components/pages/profile-pages/profile-posts-pages/posts-page-component/posts-page.component';
import { PostsFromTrashPageComponent } from './components/pages/profile-pages/profile-posts-pages/posts-from-trash-page/posts-from-trash-page.component';

registerLocaleData(localeRu, 'ru');


@NgModule({
    declarations: [
        AppComponent,
        PostComponent,
        PostDetailsPageComponent,
        AccountEditorPageComponent,
        BlogPageComponent,
        SingUpPageComponent,
        SingInPageComponent,
        AuthorsPageComponent,
        AuthorComponent,
        CategoriesPageComponent,
        AddEditPostPageComponent,
        SafeHtmlPipe,
        ProfilePageComponent,

        RejectedPostsPageComponent,
        PublishedPostsPageComponent,
        DraftPostsPageComponent,
        PendingPostsPageComponent,
        MainHeaderComponent,
        CommentComponent,
        EditCommentComponent,
        PostsByAuthorPageComponent,
        PostsByCategoryPageComponent,
        AddComplaintComponent,
        ProfileCommentsPageComponent,
        ProfileSubscriptionsPageComponent,
        ProfileLikedPostsPageComponent,
        SearchComponent,
        ProfileHeaderComponent,
        ProfilePostsHeaderComponent,
        PostsPageComponent,
        PostsFromTrashPageComponent,
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
        {provide: 'HOST_URL', useValue: "https://localhost:7299/"},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
