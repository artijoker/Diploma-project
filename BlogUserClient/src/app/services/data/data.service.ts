import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Post} from 'src/app/model/Post';
import {Account} from "../../model/Account";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private source = new BehaviorSubject<Post[]>([]);
    currentPosts = this.source.asObservable();

    constructor() {
    }

    sendOutPosts(posts: Post[]) {
        this.source.next(posts);
    }
}
