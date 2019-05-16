/* eslint-disable camelcase */

const pkg = require('./package.json');

module.exports = {
    manifest_version: 2,
    name: 'Q Bookmarks',
    version: pkg.version,
    description: pkg.description,
    browser_action: {
        default_icon: 'images/icon-19.png',
        default_popup: 'popup.html',
        default_title: 'Q Bookmarks',
    },
    content_security_policy: `default-src 'self'; img-src 'self' chrome://favicon`,
    icons: {
        16: 'images/icon-16.png',
        48: 'images/icon-48.png',
        128: 'images/icon-128.png',
    },
    minimum_chrome_version: '73',
    options_ui: {
        chrome_style: true,
        page: 'options-page.html',
    },
    permissions: [
        'activeTab',
        'bookmarks',
        'chrome://favicon/',
    ],
};
