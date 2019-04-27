import PropTypes from 'prop-types';
import React from 'react';

import BookmarkNode from '../entities/bookmark-node';
import BookmarkFolderView from './bookmark-folder-view.js';
import BookmarkItemView from './bookmark-item-view.js';

export const RootFolderView = ({ root }) => {
    const [bookmarkBar, otherBookmarks] = root.children;

    return (
        <div>
            <BookmarkFolderView bookmarkFolder={bookmarkBar} />
            <BookmarkItemView bookmarkNode={otherBookmarks} />
        </div>
    );
};

RootFolderView.propTypes = {
    root: PropTypes.instanceOf(BookmarkNode).isRequired,
};

export default RootFolderView;
