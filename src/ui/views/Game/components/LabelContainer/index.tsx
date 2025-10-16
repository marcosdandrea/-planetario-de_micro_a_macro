import React from 'react';
import styles from './style.module.css';

const LabelContainer = ({ children, style }) => {
    return (
        <div
            style={style}
            className={styles.labelsContainer}>
            {children}
        </div>
    );
}
 
export default LabelContainer;