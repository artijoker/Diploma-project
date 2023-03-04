import {Input, OnInit} from "@angular/core";
import {Post} from "./model/Post";
import {PostService} from "./services/post/post.service";
import {Router} from "@angular/router";

export class ProfilePosts{


    constructor(private _postService: PostService,
                private _router: Router,
                private posts: Post[]) {
    }

    getPost() {
        return this.posts;
    }

    goToPost(postId: number) {
        this._router.navigate(
            ['post', postId]
        );
    }

    editPost(postId: number) {
        this._router.navigate(
            ['edit-post', postId]
        );

    }
    sendPostToDraft(postId: number) {
        this._postService.setPostStatusDraftById(postId)
            .subscribe(response => {
                if (response.succeeded) {
                    alert("Пост перемещен в черновики");
                    this.posts = this.posts.filter(p => p.id != postId);
                } else {
                    alert(response.message);
                }
            });

    }

    sendPostToTrash(postId: number) {
        this._postService.postSendToTrashById(postId)
            .subscribe(response => {
                if (response.succeeded) {
                    alert("Пост отправлен в корзину");
                    this.posts = this.posts.filter(p => p.id != postId);
                } else {
                    alert(response.message);
                }
            })

    }

    publishPost(postId: number) {
        this._postService.setPostStatusPendingById(postId)
            .subscribe(response => {
                if (response.succeeded) {
                    alert("Пост будет опубликаван после проверки модератором");
                    this.posts = this.posts.filter(p => p.id != postId);
                } else {
                    alert(response.message);
                }
            })

    }

    restorePostById(postId: number){
        this._postService.restorePostById(postId)
            .subscribe(response => {
                if (response.succeeded) {
                    this.posts = this.posts.filter(p => p.id != postId);
                    alert("Пост восстановлен и перемещен в черновики");
                } else {
                    alert(response.message);
                }
            });
    }

    deletePostById(postId: number){
        let result = confirm(
            "Внимание пост будет удален и вы не сможете его восстонавить. " +
            "Продолжить выпонение операции?");
        if(result)
            this._postService.removePost(postId)
                .subscribe(response => {
                    if (response.succeeded) {
                        this.posts = this.posts.filter(p => p.id != postId);
                        alert("Пост успешно удален");
                    } else {
                        alert(response.message);
                    }
                });
    }
}

