import React from 'react';
import ReactDom from 'react-dom';

import RootFolderView from './components/root-folder-view.js';
import ChromeContext from './contexts/chrome-context.js';
import WindowContext from './contexts/window-context.js';
import BookmarkService from './services/bookmark-service.js';
import BookmarkQueryService from './services/bookmark-query-service.js';
import OptionsService from './services/options-service.js';

const Popup = () => {
    const chrome = React.useContext(ChromeContext);
    const window = React.useContext(WindowContext);

    const [root, setRoot] = React.useState(null);

    const bookmarkQueryService = new BookmarkQueryService({ chrome });
    const optionsService = new OptionsService({ chrome });
    const bookmarkService = new BookmarkService({ chrome, optionsService, window });

    React.useEffect(() => {
        (async () => {
            const root = await bookmarkQueryService.queryRoot();
            setRoot(root);
        })();
    }, []);

    if (root === null)
        return <div />;

    return <RootFolderView bookmarkService={bookmarkService} root={root} />;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
