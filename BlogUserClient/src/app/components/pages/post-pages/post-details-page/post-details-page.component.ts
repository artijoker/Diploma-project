import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from 'src/app/model/Post';
import {PostService} from 'src/app/services/post/post.service';
import {AccountService} from "../../../../services/account/account.service";
import {Location} from '@angular/common';
import jwt_decode from 'jwt-decode';
import {Comment} from "../../../../model/Comment";
import {CommentService} from "../../../../services/comment/comment.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ComplaintService} from "../../../../services/complaint/complaint.service";
import {AddComplaintComponent} from "../../../modal-windows/add-complaint/add-complaint.component";
import {PostStatus} from "../../../../PostStatus";

@Component({
    selector: 'app-post-details-page',
    templateUrl: './post-details-page.component.html',
    styleUrls: ['./post-details-page.component.css']
})
export class PostDetailsPageComponent implements OnInit {

    post?: Post;
    comments: Comment[] = [];
    postId: number;
    isAuthorizedUserPost: boolean = false;
    isPostLoadComplete: boolean = false;
    isCommentsLoadComplete: boolean = false;
    isAuthorized: boolean = false;
    isSubscribedToAuthor: boolean = false;
    isLike: boolean = false;
    isDislike: boolean = false;
    textComment: string = "";
    status?: PostStatus;
    public readonly postStatus: typeof PostStatus = PostStatus;

    constructor(private _activateRoute: ActivatedRoute,
                private _router: Router,
                private _location: Location,
                private _postService: PostService,
                private _commentService: CommentService,
                private _complaintService: ComplaintService,
                private _accountService: AccountService,
                private _modalService: NgbModal) {
        this.postId = this._activateRoute.snapshot.params['post-id'];

    }

    ngOnInit(): void {
        this._postService.getPostById(this.postId)
            .subscribe(response => {
                if (response.succeeded) {
                    this.post = response.result
                    this.status = this.post.status as PostStatus;
                    let token = localStorage.getItem("token");
                    if (token !== null) {
                        this.isAuthorized = true;
                        let tokenDecode: { nameid: string } = jwt_decode(token);
                        this.isAuthorizedUserPost = this.post.authorId.toString() === tokenDecode.nameid;

                        this._accountService.checkSubscribedToAuthor(this.post?.authorId)
                            .subscribe(
                                response => {
                                    if (response.succeeded) {
                                        this.isSubscribedToAuthor = response.result;
                                    } else
                                        alert(response.message);
                                }
                            );

                        this._postService.checkLikeByPostId(this.post?.id)
                            .subscribe(
                                response => {
                                    if (response.succeeded) {
                                        this.isLike = response.result;
                                    } else
                                        alert(response.message);
                                }
                            );

                        if (!this.isLike)
                            this._postService.checkDislikeByPostId(this.post?.id)
                                .subscribe(
                                    response => {
                                        if (response.succeeded) {
                                            this.isDislike = response.result;
                                        } else
                                            alert(response.message);
                                    }
                                );
                    }
                    this.isPostLoadComplete = true;
                    this.loadComments();
                } else {
                    alert(response.message);
                }
            })


    }

    goToPostEditor() {
        this._router.navigate(
            ['edit-post', this.post?.id]
        );
    }

    goToPostsByAuthor() {
        if (this.post?.authorId !== undefined) {
            this._router.navigate(
                ['authors/posts-by-author', this.post?.authorId]
            );
        }
    }

    sendPostToDraft() {
        if (this.post !== undefined) {
            this._postService.setPostStatusDraftById(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Пост перемещен в черновики");
                        this._router.navigate(['my-posts/draft-posts']);
                    } else {
                        alert(response.message);
                    }
                })

        }
    }

    sendPostToTrash() {
        if (this.post !== undefined) {
            this._postService.postSendToTrashById(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Пост отправлен в корзину");
                        this._router.navigate(['my-posts/trash']);
                    } else {
                        alert(response.message);
                    }
                })

        }
    }
    publishPost(){
        if (this.post !== undefined) {
            this._postService.setPostStatusPendingById(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Пост будет опубликаван после проверки модератором");
                        this._router.navigate(['my-posts/pending-posts']);
                    } else {
                        alert(response.message);
                    }
                })
        }
    }

    loadComments() {
        if (this.post !== undefined) {
            this.isCommentsLoadComplete = false;
            this._commentService.getCommentsByPostId(this.post.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        this.comments = response.result;
                        this.isCommentsLoadComplete = true;
                    } else {
                        alert(response.message);
                    }

                })
        }

    }

    addComment() {
        if (this.textComment === "") {
            alert("Введите текст комментария");
            return;
        }
        if (this.post !== undefined) {
            this._commentService.addComment(this.textComment, this.post.id)
                .subscribe(response => {
                        if (response.succeeded) {
                            this.comments = response.result
                            this.textComment = "";
                        } else {
                            alert(response.message);
                        }
                    }
                );
        }
    }

    editComment(newTextComment: string, commentId: number) {
        let index = this.comments.findIndex(c => c.id == commentId);
        let comment = this.comments[index];
        if (comment.text !== newTextComment) {
            this._commentService.updateComment(newTextComment, comment.id)
                .subscribe(response => {
                        if (response.succeeded) {
                            comment.text = newTextComment;
                            this.comments[index] = comment;
                        } else {
                            alert(response.message);
                        }
                    }
                );
        }
    }

    deleteComment(commentId: number) {
        this._commentService.removeComment(commentId)
            .subscribe(response => {
                    if (response.succeeded) {
                        this.comments = this.comments.filter(c => c.id != commentId);
                    } else {
                        alert(response.message);
                    }
                }
            );
    }

    reloadComments() {
        this.loadComments();
    }

    addComplaintOnPost() {
        let modalRef = this._modalService.open(AddComplaintComponent, {size: "lg"});
        modalRef.result.then(
            result => {
                if (result !== undefined) {
                    if (this.post !== undefined)
                        this._complaintService.addComplaintOnPost(result, this.post?.id)
                            .subscribe(response => {
                                    if (response.succeeded)
                                        alert("Жалоба отправлена");
                                    else
                                        alert(response.message);
                                }
                            );

                }
            }).catch(reason => {
            }
        );
    }

    addComplaintOnComment(textComplaint: string, commentId: number) {
        this._complaintService.addComplaintOnComment(textComplaint, commentId)
            .subscribe(response => {
                    if (response.succeeded)
                        alert("Жалоба отправлена");
                    else
                        alert(response.message);
                }
            );
    }

    subscribeToAuthor() {
        this.isSubscribedToAuthor = true;
        if (this.post !== undefined)
            this._accountService.subscribeToAuthor(this.post?.authorId).subscribe(
                response => {
                    if (response.succeeded) {
                        alert("Вы подписались на автора " + this.post?.authorNickname);
                    } else {
                        this.isSubscribedToAuthor = false;
                        alert(response.message);
                    }
                }
            )
    }

    unsubscribeFromAuthor() {
        this.isSubscribedToAuthor = false;
        if (this.post !== undefined)
            this._accountService.unsubscribeFromAuthor(this.post?.authorId).subscribe(
                response => {
                    if (response.succeeded) {

                        alert("Вы отписались от автора " + this.post?.authorNickname);
                    } else {
                        this.isSubscribedToAuthor = true;
                        alert(response.message);
                    }

                }
            )
    }

    likePost() {
        if (this.isLike) {
            this.removeLikeFromPost();
        } else {
            this.addLikeToPost();
        }
    }

    dislikePost() {
        if (this.isDislike) {
            this.removeDislikeFromPost();
        } else {
            this.addDislikeToPost();
        }
    }

    addLikeToPost() {
        if (this.post !== undefined) {
            this.isLike = true;
            this.post.likes += 1;


            this._postService.addLikeToPostById(this.post.id)
                .subscribe(
                    response => {
                        if (response.succeeded) {
                            if (this.isDislike) {
                                this.isDislike = false;
                                if (this.post !== undefined)
                                    this.post.dislikes -= 1;
                            }
                        } else {
                            this.isLike = false;
                            if (this.post !== undefined)
                                this.post.likes -= 1;

                        }
                    }
                )
        }
    }

    removeLikeFromPost() {
        if (this.post !== undefined) {
            this.isLike = false;
            this.post.likes -= 1;


            this._postService.removeLikeFromPostById(this.post.id)
                .subscribe(
                    response => {
                        if (!response.succeeded) {
                            this.isLike = true;
                            if (this.post !== undefined)
                                this.post.likes += 1;
                        }

                    }
                );
        }
    }

    addDislikeToPost() {
        if (this.post !== undefined) {
            this.isDislike = true;
            this.post.dislikes += 1;


            this._postService.addDislikeToPostById(this.post.id)
                .subscribe(
                    response => {
                        if (response.succeeded) {
                            if (this.isLike) {
                                this.isLike = false;
                                if (this.post !== undefined)
                                    this.post.likes -= 1;
                            }

                        } else {
                            this.isDislike = false;
                            if (this.post !== undefined)
                                this.post.dislikes -= 1;

                        }
                    }
                );
        }
    }

    removeDislikeFromPost() {
        if (this.post !== undefined) {
            this.isDislike = false;
            this.post.dislikes -= 1;

            this._postService.removeDislikeFromPostById(this.post.id)
                .subscribe(
                    response => {
                        if (!response.succeeded) {
                            this.isDislike = true;
                            if (this.post !== undefined)
                                this.post.dislikes += 1;
                        }

                    }
                );
        }
    }
}
