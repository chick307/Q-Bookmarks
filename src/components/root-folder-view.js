import PropTypes from 'prop-types';
import React from 'react';

import BookmarkNode from '../entities/bookmark-node';
import useTooltipIfTextOverflow from '../hooks/tooltip-if-text-overflow.js';
import BookmarkFolderView from './bookmark-folder-view.js';
import BookmarkItemView from './bookmark-item-view.js';
import styles from './root-folder-view.css';

export const RootFolderView = ({ bookmarkService, root }) => {
    const [bookmarkBar, otherBookmarks] = root.children;

    const [stack, setStack] = React.useState([]);

    const titleRef = React.useRef();

    const bookmarkFolder = stack.length === 0 ? null : stack[stack.length - 1];

    const onBackButtonClick = React.useCallback(() => {
        setStack((stack) => stack.slice(0, -1));
    }, []);

    const onBookmarkManagerButtonClick = React.useCallback(() => {
        bookmarkService.handleBookmarkManagerButtonClick(bookmarkFolder);
    }, [bookmarkService, bookmarkFolder]);

    const onNodeClick = React.useCallback((bookmarkNode) => {
        if (bookmarkNode.isFolder()) {
            setStack((stack) => [...stack, bookmarkNode]);
        } else {
            bookmarkService.handleBookmarkClick(bookmarkNode);
        }
    }, [bookmarkService]);

    const onNodeMiddleClick = React.useCallback((bookmarkNode) => {
        if (!bookmarkNode.isFolder())
            bookmarkService.handleBookmarkMiddleClick(bookmarkNode);
    }, [bookmarkService]);

    useTooltipIfTextOverflow(titleRef, [bookmarkFolder === null ? bookmarkBar.title : bookmarkFolder.title]);

    const bookmarkManagerButton = (
        <button className={styles.bookmarkManagerButton} onClick={onBookmarkManagerButtonClick}>
            <img width={16} height={16} src={'images/fontawesome/ellipsis-h.svg'}
                alt={'The icon for the button to open bookmark manager'} />
        </button>
    );

    return (
        <div className={styles.view}>
            {bookmarkFolder === null ? (
                <>
                    <div className={styles.titleBar}>
                        <div ref={titleRef} className={styles.title}>{bookmarkBar.title}</div>
                        {bookmarkManagerButton}
                    </div>
                    {bookmarkBar.children.length === 0 ? null : <BookmarkFolderView bookmarkFolder={bookmarkBar}
                        onNodeClick={onNodeClick} onNodeMiddleClick={onNodeMiddleClick} />}
                    <BookmarkItemView bookmarkNode={otherBookmarks}
                        onNodeClick={onNodeClick} onNodeMiddleClick={onNodeMiddleClick} />
                </>
            ) : (
                <>
                    <div className={styles.titleBar}>
                        <button className={styles.backButton} onClick={onBackButtonClick}>
                            <img width={16} height={16} src={'images/fontawesome/angle-left.svg'}
                                alt={'The icon for the back button'} />
                        </button>
                        <div ref={titleRef} className={styles.title}>{bookmarkFolder.title}</div>
                        {bookmarkManagerButton}
                    </div>
                    <BookmarkFolderView bookmarkFolder={bookmarkFolder}
                        onNodeClick={onNodeClick} onNodeMiddleClick={onNodeMiddleClick} />
                </>
            )}
        </div>
    );
};

RootFolderView.propTypes = {
    bookmarkService: PropTypes.object.isRequired,
    root: PropTypes.instanceOf(BookmarkNode).isRequired,
};

export default RootFolderView;
