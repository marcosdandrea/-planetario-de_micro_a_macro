import React from 'react';
import styles from './style.module.css';
import {Steps} from 'antd'
import useUnits from '@hooks/useUnits';
import { panelContext } from '@contexts/PanelContext';


const SpriteSelection = () => {
    const { selectedSprite, setSelectedSprite, sprites } = React.useContext(panelContext);
    const {units} = useUnits()

    const getSize = (sprite) => {
        const unitToUse = units.find(u => u.name === sprite.unit)
        if (!unitToUse) return `${sprite.base10Size} m`
        const value = unitToUse.fromBase10(sprite.base10Size).toLocaleString("es-AR");
        return `${value} ${unitToUse.symbol}`
    }

    const getSelectedIndex = () => {
        if (!selectedSprite || !sprites) return -1;
        return sprites.findIndex(sprite => sprite.id === selectedSprite.id);
    }

    const handleStepChange = (current: number) => {
        if (sprites && sprites[current]) {
            setSelectedSprite(sprites[current]);
        }
    }
    
    return (
        <div className={styles.container}>
           <Steps
            direction="vertical"
            progressDot
            size="small"
            
            current={getSelectedIndex()}
            onChange={handleStepChange}
            items={sprites?.map((sprite, index) => {
                const isSelected = selectedSprite?.id === sprite.id;
                return {
                    title: sprite.displayName,
                    description: getSize(sprite),
                    className: isSelected ? styles.selectedStep : ''
                }
            })}
           />
        </div>
    );
}
 
export default SpriteSelection;