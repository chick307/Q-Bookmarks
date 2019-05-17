import PropTypes from 'prop-types';
import React from 'react';

import styles from './radio-select.css';

const Context = React.createContext();

const generateName = ((i) => () => `radio-select-${i++}`)(0);

export const RadioSelect = ({ children, onChange, value = {} }) => {
    const inputName = React.useMemo(generateName, []);

    const contextValue = React.useMemo(() => ({
        inputName,
        onChange,
        value,
    }), [onChange, value]);

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

RadioSelect.Item = ({ children, value }) => {
    const contextValue = React.useContext(Context);

    const checked = value === contextValue.value;

    const onChange = React.useCallback(() => {
        contextValue.onChange(value);
    }, [value]);

    return (
        <div className={styles.item}>
            <label>
                <input className={styles.radioButton} type={'radio'}
                    name={contextValue.inputName} onChange={onChange} checked={checked} />
                <div className={styles.itemChildren}>{children}</div>
            </label>
        </div>
    );
};

RadioSelect.Item.displayName = 'RadioSelect.Item';

RadioSelect.Item.propTypes = {
    children: PropTypes.node,
    value: PropTypes.any.isRequired,
};

RadioSelect.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.any,
};

export default RadioSelect;
