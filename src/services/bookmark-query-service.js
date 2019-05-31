import BookmarkNode from '../entities/bookmark-node.js';

export default class BookmarkQueryService {
    constructor({ chrome }) {
        this._chrome = chrome;
    }

    async queryRoot() {
        const root = await new Promise((resolve) => {
            this._chrome.bookmarks.getTree(([root]) => {
                resolve(root);
            });
        });

        const toBookmarkNode = (node) => {
            const { id, index, url, title } = node;
            const children = node.children ? node.children.map(toBookmarkNode) : null;
            const parent = node.parentId == null ? null : { id: node.parentId };
            return new BookmarkNode({ id, parent, index, url, title, children });
        };

        const node = toBookmarkNode(root);
        return node;
    }
}
