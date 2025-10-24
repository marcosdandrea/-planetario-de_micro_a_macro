import React from 'react';
import style from './style.module.css';

const Header = () => {
    return (
        <div className={style.header}>
            <div className={style.logos}>
                <div className={style.logoPlanetario}/>
                <div className={style.logoLab}/>
            </div>
            <div className={style.title}>
                De lo Micro <br/>a lo Macro.
            </div>
            <div className={style.subtitle}>
                Navegá deslizando <br/> la esfera.
            </div>
        </div>);
}

export default Header;