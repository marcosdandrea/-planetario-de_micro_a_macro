import React from 'react';
import styles from './style.module.css';
import { Button } from 'antd';

const Footer = ({ onSave, onCreate, onDelete }) => {
    return (
        <div className={styles.footer}>
            <Button type="primary" onClick={onCreate}>Crear</Button>
            <Button type="default" onClick={onSave}>Guardar</Button>
            <Button danger onClick={onDelete} type='text'>Eliminar</Button>
        </div>
    );
}
 
export default Footer;