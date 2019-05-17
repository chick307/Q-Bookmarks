import React from 'react';
import ReactDom from 'react-dom';

import ChromeContext from './contexts/chrome-context.js';
import RadioSelect from './components/radio-select.js';
import OptionsService from './services/options-service.js';
import { BookmarkClickBehaviors } from './services/options-service.js';
import styles from './options-page.css';

const ClickBehaviorSelect = (props) => {
    return (
        <RadioSelect {...props}>
            <RadioSelect.Item value={BookmarkClickBehaviors.openInActiveTab}>
                Open bookmarks in active tab
            </RadioSelect.Item>
            <RadioSelect.Item value={BookmarkClickBehaviors.openInNewTab}>
                Open bookmarks in new tab
            </RadioSelect.Item>
            <RadioSelect.Item value={BookmarkClickBehaviors.openInNewBackgroundTab}>
                Open bookmarks in new background tab
            </RadioSelect.Item>
        </RadioSelect>
    );
};

const useOptionsState = (optionsService, key, defaultValue) => {
    const [value, setValue] = React.useState(defaultValue);

    const set = React.useCallback((value) => {
        optionsService.set(key, value);
        setValue(value);
    }, []);

    React.useEffect(() => {
        (async () => {
            const currentValue = await optionsService.get(key);
            setValue(currentValue);
        })();
    }, []);

    return [value, set];
};

const OptionsPage = () => {
    const chrome = React.useContext(ChromeContext);

    const optionsService = new OptionsService({ chrome });

    const [clickBehavior, setClickBehavior] = useOptionsState(optionsService, 'clickBehavior', null);
    const [middleClickBehavior, setMiddleClickBehavior] = useOptionsState(optionsService, 'middleClickBehavior', null);

    return (
        <>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Click</div>
                <ClickBehaviorSelect value={clickBehavior} onChange={setClickBehavior} />
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Middle click</div>
                <ClickBehaviorSelect value={middleClickBehavior} onChange={setMiddleClickBehavior} />
            </div>
        </>
    );
};

ReactDom.render(<OptionsPage />, document.querySelector('#container'));
