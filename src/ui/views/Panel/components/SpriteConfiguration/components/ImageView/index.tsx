import React from 'react';
import { Image as AntImage } from 'antd';
import styles from './style.module.css';

export const ImageView = ({ children, image }) => {
    return (
        <div
            style={{
                backgroundColor: !image ? "#3f3f3f" : "transparent"
            }}
            className={styles.image}>
            {children}
            {
                !image ? "Seleccione una imagen" :
                    <AntImage
                        style={{ objectFit: 'contain', height: "100%" }}
                        src={`database/${image}`}
                    />
            }
        </div>
    );
}

export default ImageView;
