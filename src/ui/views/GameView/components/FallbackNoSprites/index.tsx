import React from 'react';
import style from './style.module.css';
import Text from '@components/Text';
import { PackageOpen } from 'lucide-react';

const FallbackNoSprites = () => {
    return (
        <div className={style.FallbackNoSprites}>
            <PackageOpen size={100} absoluteStrokeWidth />
            <Text
                style={{ fontFamily: "Lato Black", fontSize: "24px", marginBottom: "16px" }}>
                No hay contenido para mostrar.
            </Text>
            <Text
                style={{ fontFamily: "Lato" }}>
                Por favor, añade sprites a la escena desde el panel de edición.
            </Text>
        </div>
    );
}

export default FallbackNoSprites;