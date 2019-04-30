import PropTypes from 'prop-types';
import React from 'react';

import ChromeContext from '../contexts/chrome-context.js';
import WindowContext from '../contexts/window-context.js';
import BookmarkNode from '../entities/bookmark-node';
import BookmarkFolderView from './bookmark-folder-view.js';
import BookmarkItemView from './bookmark-item-view.js';
import styles from './root-folder-view.css';

export const RootFolderView = ({ root }) => {
    const chrome = React.useContext(ChromeContext);
    const window = React.useContext(WindowContext);

    const [bookmarkBar, otherBookmarks] = root.children;

    const [stack, setStack] = React.useState([]);

    const bookmarkFolder = stack.length === 0 ? null : stack[stack.length - 1];

    const onBackButtonClick = React.useCallback(() => {
        setStack((stack) => stack.slice(0, -1));
    }, []);

    const onNodeClick = React.useCallback((bookmarkNode) => {
        if (bookmarkNode.isFolder()) {
            setStack((stack) => [...stack, bookmarkNode]);
        } else if (bookmarkNode.isBookmarklet()) {
            const code = bookmarkNode.getBookmarkletCode();
            chrome.tabs.executeScript({ code });
            window.close();
        } else {
            const { url } = bookmarkNode;
            chrome.tabs.update({ active: true, url });
            window.close();
        }
    }, []);

    const onNodeMiddleClick = React.useCallback((bookmarkNode) => {
        if (bookmarkNode.isFolder() || bookmarkNode.isBookmarklet())
            return;
        const { url } = bookmarkNode;
        chrome.tabs.create({ url });
        window.close();
    }, []);

    return (
        <div className={styles.view}>
            {bookmarkFolder === null ? (
                <>
                    <div className={styles.titleBar}>
                        <div className={styles.title}>{bookmarkBar.title}</div>
                    </div>
                    <BookmarkFolderView bookmarkFolder={bookmarkBar}
                        onNodeClick={onNodeClick} onNodeMiddleClick={onNodeMiddleClick} />
                    <BookmarkItemView bookmarkNode={otherBookmarks}
                        onNodeClick={onNodeClick} onNodeMiddleClick={onNodeMiddleClick} />
                </>
            ) : (
                <>
                    <div className={styles.titleBar}>
                        <button className={styles.backButton} onClick={onBackButtonClick}>&lt;</button>
                        <div className={styles.title}>{bookmarkFolder.title}</div>
                    </div>
                    <BookmarkFolderView bookmarkFolder={bookmarkFolder}
                        onNodeClick={onNodeClick} onNodeMiddleClick={onNodeMiddleClick} />
                </>
            )}
        </div>
    );
};

RootFolderView.propTypes = {
    root: PropTypes.instanceOf(BookmarkNode).isRequired,
};

export default RootFolderView;
