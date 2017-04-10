import React from 'react';
import ReactDom from 'react-dom';

const Popup = () => {
    return (
        <div>
            {'Popup'}
        </div>
    );
};

ReactDom.render(<Popup />, document.querySelector('#container'));
