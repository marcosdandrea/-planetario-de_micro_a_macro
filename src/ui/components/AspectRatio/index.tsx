import React from 'react';
import style from './style.module.css';

const AspectRatio = ({ children, aspectRatio }: { children: React.ReactNode; aspectRatio: number }) => {
    return (
        <div className={style.aspectRatio}>
        <div
            className={style.content} 
            style={{ aspectRatio: aspectRatio}}>
            {children}
        </div>
        </div>
    );
}

export default AspectRatio;
