import PropTypes from 'prop-types';
import React from 'react';

import BookmarkNode from '../entities/bookmark-node.js';
import useTooltipIfTextOverflow from '../hooks/tooltip-if-text-overflow.js';
import BookmarkIcon from './bookmark-icon.js';
import styles from './bookmark-item-view.css';

const MOUSE_EVENT_MIDDLE_BUTTON = 1;

export const BookmarkItemView = ({ bookmarkNode, onNodeClick, onNodeMiddleClick }) => {
    const titleRef = React.useRef();

    const onClick = React.useCallback(() => {
        if (onNodeClick != null)
            onNodeClick(bookmarkNode);
    }, [bookmarkNode, onNodeClick]);

    const onMouseDown = React.useCallback((e) => {
        if (e.button !== MOUSE_EVENT_MIDDLE_BUTTON)
            return;
        e.preventDefault();
        if (onNodeMiddleClick != null)
            onNodeMiddleClick(bookmarkNode);
    }, [bookmarkNode, onNodeMiddleClick]);

    const inline = !bookmarkNode.title;

    useTooltipIfTextOverflow(titleRef, [bookmarkNode.title]);

    return (
        <div className={inline ? styles.inlineView : styles.blockView} onClick={onClick} onMouseDown={onMouseDown}>
            <span className={styles.icon}>
                <BookmarkIcon bookmarkNode={bookmarkNode} />
            </span>
            {inline ? null : (
                <span ref={titleRef} className={styles.title}>
                    {bookmarkNode.title}
                </span>
            )}
        </div>
    );
};

BookmarkItemView.propTypes = {
    bookmarkNode: PropTypes.instanceOf(BookmarkNode).isRequired,
    onNodeClick: PropTypes.func,
    onNodeMiddleClick: PropTypes.func,
};

export default BookmarkItemView;
