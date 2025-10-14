import React, { forwardRef } from 'react';
import styles from './style.module.css';

const Indicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((_props, ref) => {
    return (
        <div
            ref={ref}
            className={styles.indicator} />
    );
})

export default Indicator;