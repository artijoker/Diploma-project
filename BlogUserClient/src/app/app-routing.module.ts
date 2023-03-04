import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorsPageComponent} from './components/pages/authors-page/authors-page.component';
import {BlogPageComponent} from './components/pages/blog-page/blog-page.component';
import {CategoriesPageComponent} from './components/pages/categories-page/categories-page.component';
import {SingInPageComponent} from './components/pages/sing-in-page/sing-in-page.component';
import {SingUpPageComponent} from './components/pages/sing-up-page/sing-up-page.component';
import {PostDetailsPageComponent} from './components/pages/post-pages/post-details-page/post-details-page.component';
import {AddEditPostPageComponent} from "./components/pages/post-pages/add-edit-post-page/add-edit-post-page.component";
import {ProfilePageComponent} from "./components/pages/profile-pages/profile-page/profile-page.component";
import {AccountEditorPageComponent} from "./components/pages/profile-pages/account-editor-page/account-editor-page.component";
import {DraftPostsPageComponent} from "./components/pages/profile-pages/profile-posts-pages/draft-posts-page/draft-posts-page.component";
import { PublishedPostsPageComponent } from './components/pages/profile-pages/profile-posts-pages/published-posts-page/published-posts-page.component';
import {RejectedPostsPageComponent} from "./components/pages/profile-pages/profile-posts-pages/rejected-posts-page/rejected-posts-page.component";
import {PendingPostsPageComponent} from "./components/pages/profile-pages/profile-posts-pages/pending-posts-page/pending-posts-page.component";
import {PostsByAuthorPageComponent} from "./components/pages/posts-by-author-page/posts-by-author-page.component";
import {PostsByCategoryPageComponent} from "./components/pages/posts-by-category-page/posts-by-category-page.component";
import {ProfileCommentsPageComponent} from "./components/pages/profile-pages/profile-comments-page/profile-comments-page.component";

import {ProfileSubscriptionsPageComponent} from "./components/pages/profile-pages/profile-subscriptions-page/profile-subscriptions-page.component";
import {ProfileLikedPostsPageComponent} from "./components/pages/profile-pages/profile-liked-posts-page/profile-liked-posts-page.component";
import {PostsFromTrashPageComponent} from "./components/pages/profile-pages/profile-posts-pages/posts-from-trash-page/posts-from-trash-page.component";

const routes: Routes = [
    {path: '', redirectTo: '/blog', pathMatch: 'full'},
    {path: 'blog', component: BlogPageComponent},
    {path: 'authors', component: AuthorsPageComponent},
    {path: 'sing-up', component: SingUpPageComponent},
    {path: 'sing-in', component: SingInPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'add-post', component: AddEditPostPageComponent},

    {path: 'my-profile', component: ProfilePageComponent},
    {path: 'edit-account', component: AccountEditorPageComponent},
    {path: 'my-comments', component: ProfileCommentsPageComponent},
    {path: 'my-liked-posts', component: ProfileLikedPostsPageComponent},
    {path: 'my-subscriptions', component: ProfileSubscriptionsPageComponent},

    {path: 'my-posts', redirectTo: '/my-posts/draft-posts', pathMatch: 'full'},
    {path: 'my-posts/draft-posts', component: DraftPostsPageComponent},
    {path: 'my-posts/published-posts', component: PublishedPostsPageComponent},
    {path: 'my-posts/pending-posts', component: PendingPostsPageComponent},
    {path: 'my-posts/rejected-posts', component: RejectedPostsPageComponent},
    {path: 'my-posts/trash', component: PostsFromTrashPageComponent},

    {path: 'post/:post-id', component: PostDetailsPageComponent},
    {path: 'edit-post/:post-id', component: AddEditPostPageComponent},


    {path: 'authors/posts-by-author/:author-id', component: PostsByAuthorPageComponent},
    {path: 'categories/posts-by-category/:category-id', component: PostsByCategoryPageComponent},



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
