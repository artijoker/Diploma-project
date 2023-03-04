import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsPageComponent} from './components/pages/accounts-page/accounts-page.component';
import {PublicationsPageComponent} from './components/pages/publications-page/publications-page.component';
import {CategoriesPageComponent} from './components/pages/categories-page/categories-page.component';
import {SingInPageComponent} from './components/pages/sing-in-page/sing-in-page.component';
import {PostDetailsPageComponent} from './components/pages/post-details-page/post-details-page.component';
import {PostsComponent} from './components/posts/posts.component';

import {ComplaintsOnPostsPageComponent} from "./components/pages/complaints-on-posts-page/complaints-on-posts-page.component";
import {
    ComplaintsOnCommentsPageComponent
} from "./components/pages/complaints-on-comments-page/complaints-on-comments-page.component";
import {AddEditPostPageComponent} from "./components/pages/add-edit-post-page/add-edit-post-page.component";
import {CommentsPageComponent} from "./components/pages/comments-page/comments-page.component";
import {PostsByAccountPageComponent} from "./components/pages/posts-by-account-page/posts-by-account-page.component";
import {PostsByCategoryPageComponent} from "./components/pages/posts-by-category-page/posts-by-category-page.component";

const routes: Routes = [
    {path: '', redirectTo: '/sing-in', pathMatch: 'full'},
    {path: 'sing-in', component: SingInPageComponent},
    {path: 'publications', component: PublicationsPageComponent},
    {path: 'accounts', component: AccountsPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'comments', component: CommentsPageComponent},
    {path: 'add-post', component: AddEditPostPageComponent},

    {path: 'complaints', redirectTo: '/complaints/on-posts', pathMatch: 'full'},
    {path: 'complaints/on-posts', component: ComplaintsOnPostsPageComponent},
    {path: 'complaints/on-comment', component: ComplaintsOnCommentsPageComponent},

    {path: 'post/:post-id', component: PostDetailsPageComponent},
    {path: 'edit-post/:post-id', component: AddEditPostPageComponent},

    {path: 'posts-by-account/:account-id', component: PostsByAccountPageComponent},
    {path: 'posts-by-category/:category-id', component: PostsByCategoryPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
