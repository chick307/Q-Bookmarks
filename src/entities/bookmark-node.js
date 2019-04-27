export default class BookmarkNode {
    constructor({ id, parent = null, index = 0, url = null, title, children = null }) {
        this.id = id;
        this.parent = parent;
        this.index = index;
        this.url = url;
        this.title = title;
        this.children = children;
    }

    isFolder() {
        return this.children !== null;
    }

    isRoot() {
        return this.parent === null;
    }
}
