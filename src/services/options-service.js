export const BookmarkClickBehaviors = {
    openInActiveTab: 1,
    openInNewTab: 2,
    openInNewBackgroundTab: 3,
};

const defaultOptions = Object.freeze({
    clickBehavior: BookmarkClickBehaviors.openInActiveTab,
    middleClickBehavior: BookmarkClickBehaviors.openInNewTab,
});

export default class OptionsService {
    constructor({ chrome }) {
        this._chrome = chrome;
    }

    async get(key) {
        const options = await new Promise((resolve) => {
            this._chrome.storage.local.get([key], resolve);
        });

        if (options[key] === undefined)
            return defaultOptions[key];
        return options[key];
    }

    async set(key, value) {
        await new Promise((resolve) => {
            this._chrome.storage.local.set({ [key]: value }, resolve);
        });
    }
}
