import {Post} from "./model/Post";

export class ComparePosts {

    public static descendingDate() {
        return (a: Post, b: Post) => {
            if (a.lastChange < b.lastChange)
                return 1;
            if (a.lastChange > b.lastChange)
                return -1;
            return 0;
        };
    }
}
