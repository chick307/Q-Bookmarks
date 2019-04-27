import PropTypes from 'prop-types';
import React from 'react';

import BookmarkNode from '../entities/bookmark-node.js';
import BookmarkIcon from './bookmark-icon.js';
import styles from './bookmark-item-view.css';

const MOUSE_EVENT_MIDDLE_BUTTON = 1;

export const BookmarkItemView = ({ bookmarkNode }) => {
    const inline = !bookmarkNode.title;

    return (
        <div className={inline ? styles.inlineView : styles.blockView}>
            <span className={styles.icon}>
                <BookmarkIcon bookmarkNode={bookmarkNode} />
            </span>
            {inline ? null : (
                <span className={styles.title}>
                    {bookmarkNode.title}
                </span>
            )}
        </div>
    );
};

BookmarkItemView.propTypes = {
    bookmarkNode: PropTypes.instanceOf(BookmarkNode).isRequired,
};

export default BookmarkItemView;
