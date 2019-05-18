import React from 'react';

export const useTooltipIfTextOverflow = (ref, deps) => {
    React.useEffect(() => {
        if (!ref.current)
            return;

        if (ref.current.textContent && ref.current.offsetWidth < ref.current.scrollWidth) {
            ref.current.title = ref.current.textContent;
        } else {
            ref.current.removeAttribute('title');
        }
    }, deps);
};

export default useTooltipIfTextOverflow;
