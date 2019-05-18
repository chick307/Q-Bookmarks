import PropTypes from 'prop-types';
import React from 'react';

import ChromeContext from '../contexts/chrome-context.js';
import BookmarkNode from '../entities/bookmark-node.js';

export const BookmarkIcon = ({ bookmarkNode }) => {
    const chrome = React.useContext(ChromeContext);
    if (bookmarkNode.url) {
        const url = `chrome://favicon/${bookmarkNode.url}`;
        return (
            <img src={url} width={16} height={16} title={bookmarkNode.url} />
        );
    } else {
        const url = chrome.runtime.getURL('images/folder-16.png');
        return (
            <img src={url} width={16} height={16} title={bookmarkNode.url} />
        );
    }
};

BookmarkIcon.propTypes = {
    bookmarkNode: PropTypes.instanceOf(BookmarkNode).isRequired,
};

export default BookmarkIcon;
