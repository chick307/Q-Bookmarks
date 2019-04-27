import React from 'react';
import ReactDom from 'react-dom';

import RootFolderView from './components/root-folder-view.js';
import ChromeContext from './contexts/chrome-context.js';
import BookmarkQueryService from './services/bookmark-query-service.js';

const Popup = () => {
    const chrome = React.useContext(ChromeContext);

    const [root, setRoot] = React.useState(null);

    const bookmarkQueryService = new BookmarkQueryService({ chrome });

    React.useEffect(() => {
        (async () => {
            const root = await bookmarkQueryService.queryRoot();
            setRoot(root);
        })();
    }, []);

    if (root === null)
        return <div />;

    return <RootFolderView root={root} />;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
