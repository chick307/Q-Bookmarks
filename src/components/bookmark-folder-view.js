import PropTypes from 'prop-types';
import React from 'react';

import BookmarkNode from '../entities/bookmark-node.js';
import BookmarkItemView from './bookmark-item-view.js';
import styles from './bookmark-folder-view.css';

export const BookmarkFolderView = ({ bookmarkFolder, onNodeClick, onNodeMiddleClick }) => {
    return (
        <div className={styles.view}>
            {bookmarkFolder.children.map((node) => (
                <BookmarkItemView key={node.id} bookmarkNode={node}
                    onNodeClick={onNodeClick} onNodeMiddleClick={onNodeMiddleClick} />
            ))}
        </div>
    );
};

BookmarkFolderView.propTypes = {
    bookmarkFolder: PropTypes.instanceOf(BookmarkNode).isRequired,
    onNodeClick: PropTypes.func,
    onNodeMiddleClick: PropTypes.func,
};

export default BookmarkFolderView;
