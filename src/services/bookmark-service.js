import { BookmarkClickBehaviors } from './options-service.js';

export default class BookmarkService {
    constructor({ chrome, optionsService, window }) {
        this._chrome = chrome;
        this._optionsService = optionsService;
        this._window = window;
    }

    _handleBookmarkItemClick(bookmarkItem, behavior) {
        switch (behavior) {
            case BookmarkClickBehaviors.openInActiveTab:
                this.openInActiveTab(bookmarkItem);
                this._window.close();
                break;
            case BookmarkClickBehaviors.openInNewTab:
                this.openInNewTab(bookmarkItem);
                this._window.close();
                break;
            case BookmarkClickBehaviors.openInNewBackgroundTab:
                this.openInNewBackgroundTab(bookmarkItem);
                break;
        }
    }

    _handleBookmarkletClick(bookmarklet) {
        const code = bookmarklet.getBookmarkletCode();
        this._chrome.tabs.executeScript({ code });
        this._window.close();
    }

    async handleBookmarkClick(bookmarkNode) {
        if (bookmarkNode.isFolder())
            return;

        if (bookmarkNode.isBookmarklet())
            return this._handleBookmarkletClick(bookmarkNode);

        const behavior = await this._optionsService.get('clickBehavior');
        this._handleBookmarkItemClick(bookmarkNode, behavior);
    }

    async handleBookmarkMiddleClick(bookmarkNode) {
        if (bookmarkNode.isFolder())
            return;

        if (bookmarkNode.isBookmarklet())
            return this._handleBookmarkletClick(bookmarkNode);

        const behavior = await this._optionsService.get('middleClickBehavior');
        this._handleBookmarkItemClick(bookmarkNode, behavior);
    }

    handleBookmarkManagerButtonClick(bookmarkFolder) {
        this.openBookmarkManager(bookmarkFolder == null ? {} : bookmarkFolder);
        this._window.close();
    }

    async openBookmarkManager({ id = null } = {}) {
        const tab = await new Promise((resolve) => {
            const url = `chrome://bookmarks${id === null ? '' : `/?id=${encodeURIComponent(id)}`}`;
            this._chrome.tabs.create({ url }, resolve);
        });

        return tab;
    }

    async openInActiveTab({ url }) {
        const tab = await new Promise((resolve) => {
            this._chrome.tabs.update({ active: true, url }, resolve);
        });

        return tab;
    }

    async openInNewTab({ url }) {
        const tab = await new Promise((resolve) => {
            this._chrome.tabs.create({ url }, resolve);
        });

        return tab;
    }

    async openInNewBackgroundTab({ url }) {
        const tab = await new Promise((resolve) => {
            this._chrome.tabs.create({ active: false, url }, resolve);
        });

        return tab;
    }
}
