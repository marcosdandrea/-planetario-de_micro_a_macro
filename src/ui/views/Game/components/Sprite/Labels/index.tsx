import React from 'react';
import style from './style.module.css';

const Labels = React.memo(({title, subtitle, displaySize, alignment}:{title: string; subtitle: string; displaySize: string; alignment: 'left' | 'center' | 'right'}) => {

    // Función para renderizar texto con saltos de línea
    const renderTextWithLineBreaks = (text: string) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div 
            style={{
                alignItems: alignment === 'right' ? 'flex-end' : (alignment === 'center' ? 'center' : 'flex-start'),
                textAlign: alignment
            }}
            className={style.labels}>
            <div className={style.title}>{renderTextWithLineBreaks(title)}</div>
            <div className={style.subtitle}>{renderTextWithLineBreaks(subtitle)}</div>
            <div className={style.displaySize}>{renderTextWithLineBreaks(displaySize)}</div>
        </div>
    );
})
 
export default Labels;