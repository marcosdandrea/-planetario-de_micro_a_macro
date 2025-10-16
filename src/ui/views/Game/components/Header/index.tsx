import React from 'react';
import style from './style.module.css';

const Header = () => {
    return (
        <div className={style.header}>
            <div className={style.logos}>
                <img src="/resources/images/Logo Planetario.png" height={50}/>
                <img src="/resources/images/Logo Lab.png"  height={50}/>
            </div>
            <div className={style.title}>
                De lo Micro <br/>a lo Macro
            </div>
            <div className={style.subtitle}>
                Navega deslizando <br/> la esfera
            </div>
        </div>);
}

export default Header;