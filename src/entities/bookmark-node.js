const BOOKMARKLET_PREFIX = 'javascript:';

export default class BookmarkNode {
    constructor({ id, parent = null, index = 0, url = null, title, children = null }) {
        this.id = id;
        this.parent = parent;
        this.index = index;
        this.url = url;
        this.title = title;
        this.children = children;
    }

    isBookmarklet() {
        return !this.isFolder() && this.url.startsWith(BOOKMARKLET_PREFIX);
    }

    isFolder() {
        return this.children !== null;
    }

    isRoot() {
        return this.parent === null;
    }

    getBookmarkletCode() {
        if (!this.isBookmarklet())
            return null;
        return decodeURIComponent(this.url.substring(BOOKMARKLET_PREFIX.length));
    }
}
