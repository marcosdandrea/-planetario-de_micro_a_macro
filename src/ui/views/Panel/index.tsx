import React from 'react';
import styles from './style.module.css';
import Header from './components/Header';
import SpriteSelection from './components/SpriteSelection';
import SpriteConfiguration from './components/SpriteConfiguration';
import { ConfigProvider, theme } from 'antd';
import PanelContextProvider from '@contexts/PanelContext';
import GameContextProvider from '@contexts/GameContext';
import PasswordProtection from '@components/PasswordProtection';

const Panel = () => {
    return (
        <PasswordProtection>
            <GameContextProvider>
                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm,
                    }}>
                    <PanelContextProvider>
                        <div className={styles.panel}>
                            <Header />
                            <div className={styles.content}>
                                <SpriteSelection />
                                <SpriteConfiguration />
                            </div>
                            <div className={styles.footer}>
                                <p>Proyecciones Digitales 2025</p>
                            </div>
                        </div>
                    </PanelContextProvider>
                </ConfigProvider>
            </GameContextProvider>
        </PasswordProtection>
    );
}

export default Panel;