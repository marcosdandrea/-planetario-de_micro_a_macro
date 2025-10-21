import React, { useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import styles from './style.module.css';
import useUnits from '@hooks/useUnits';
import { UnitName, UnitType } from '@common/types/units.type';
import { SpriteType } from '@common/types/sprite.type';

const SizeInput = ({ unsavedSprite, onChangeSize, onChangeUnit }: { unsavedSprite: SpriteType | null, onChangeSize: (base10Size: number) => void, onChangeUnit: (unit: UnitName) => void }) => {
    const { units } = useUnits();
    const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);
    const [base10Size, setBase10Size] = useState<number>(0);
    const [size, setSize] = useState<number>(0);
    const [isCreating, setIsCreating] = useState(false);
    

    // Efecto para inicializar valores cuando cambia el sprite seleccionado
    useEffect(() => {
        if (!unsavedSprite || !units.length) return;

        const unit = units.find(unit => unit.name === unsavedSprite?.unit) || units[0];
        setSelectedUnit(unit);
        setBase10Size(unsavedSprite?.base10Size || 0);
        setIsCreating (!unsavedSprite.id);
        
        // Actualizar el valor del input con la unidad correcta
        if (unit && unsavedSprite.base10Size !== undefined) {
            setSize(unit.fromBase10(unsavedSprite.base10Size));
        }
        
    }, [unsavedSprite?.id, unsavedSprite?.unit, unsavedSprite?.base10Size, units]); // Dependencias más específicas
    
    
    const handleValueChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setSize(value);
        onChangeSize(selectedUnit ? selectedUnit.toBase10(value) : value);
    }

    const handleUnitChange = (value: UnitName) => {
        const unit = units.find(unit => unit.name === value);
        if (!unit) return;
        
        // Conservar el valor visual actual del input
        const currentDisplayValue = size;
        
        setSelectedUnit(unit);
        // Convertir el valor actual a la nueva unidad
        const newBase10Value = unit.toBase10(currentDisplayValue);
        onChangeSize(newBase10Value);
        onChangeUnit(value);
    }

    if (!selectedUnit) {
        return <div>Seleccione un elemento</div>;
    }

    return (
        <Space.Compact style={{ display: 'flex', width: '100%' }}>
            <Input
                style={{ 
                    width: '60%'
                }}
                className={styles.noNumberArrows}
                onChange={handleValueChange}
                value={size || ''} 
                placeholder="Ingrese el tamaño"
                styles={{
                    input: {
                        MozAppearance: 'textfield',
                        WebkitAppearance: 'textfield',
                        appearance: 'textfield'
                    }
                }}
            />
            <Select
                style={{ width: "40%"}}
                onChange={handleUnitChange}
                value={selectedUnit?.name}
                optionFilterProp="label"
                options={units.map(unit => ({ 
                    label: `${unit.name} (${unit.symbol})`, 
                    value: unit.name 
                }))} 
            />
        </Space.Compact>
    );
};

export default SizeInput;