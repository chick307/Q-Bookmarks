import PropTypes from 'prop-types';
import React from 'react';

import BookmarkNode from '../entities/bookmark-node.js';
import BookmarkItemView from './bookmark-item-view.js';

export const BookmarkFolderView = ({ bookmarkFolder }) => {
    return (
        <div>
            {bookmarkFolder.children.map((node) => (
                <BookmarkItemView key={node.id} bookmarkNode={node} />
            ))}
        </div>
    );
};

BookmarkFolderView.propTypes = {
    bookmarkFolder: PropTypes.instanceOf(BookmarkNode).isRequired,
};

export default BookmarkFolderView;
