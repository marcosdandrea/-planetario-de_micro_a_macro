import React, { useEffect } from 'react';
import styles from './style.module.css';
import { Button, Descriptions, Input, message } from 'antd';
import { panelContext } from '@contexts/PanelContext';
import Footer from './components/Footer';
import ImageSelection from './components/ImageSelection';
import SizeInput from './components/SizeInput';
import { SpriteType } from '@common/types/sprite.type';
import { UnitName } from '@common/types/units.type';

const SpriteConfiguration = () => {
    const { selectedSprite, deleteSprite, createSprite, updateSprite } = React.useContext(panelContext);
    const [unsavedSprite, setUnsavedSprite] = React.useState<SpriteType>(selectedSprite);

    useEffect(() => {
        setUnsavedSprite(selectedSprite);
    }, [selectedSprite]);

    const handleOnChangeName = (e) => {
        setUnsavedSprite({
            ...unsavedSprite,
            displayName: e.target.value
        });
    }

    const handleOnChangeDescription = (e) => {
        setUnsavedSprite({
            ...unsavedSprite,
            description: e.target.value
        });
    }

    const handleOnChangeSize = (base10Size: number) => {
        setUnsavedSprite({
            ...unsavedSprite,
            base10Size: base10Size
        });
    }

    const handleOnChangeUnit = (value: UnitName) => {
        setUnsavedSprite({
            ...unsavedSprite,
            unit: value
        });
    }

    const handleOnSave = () => {
        if (!unsavedSprite) return;
        if (!unsavedSprite.id) {
            createSprite(unsavedSprite, (success) => {
                if (success) {
                    message.success("Item creado correctamente");
                    setUnsavedSprite(null);
                }
                else {
                    message.error("Error al crear el item");
                }
            });
        } else {
            updateSprite(unsavedSprite, (success) => {
                if (success) {
                    message.success("Item actualizado correctamente");
                }
                else {
                    message.error("Error al actualizar el item");
                }
            });
        }

    }

    const handleOnCreate = () => {
        setUnsavedSprite({
            id: null,
            displayName: '',
            description: '',
            image: null,
            isIndex: false,
            base10Size: 1,
            unit: 'metro',
            background: { image: null }
        })
    }

    const handleOnDelete = () => {
        if (!unsavedSprite) return;

        deleteSprite(unsavedSprite.id, (success) => {
            if (success) {
                message.success("Item eliminado correctamente");
                setUnsavedSprite(null);
            }
            else {
                message.error("Error al eliminar el item");
            }
        });
    } 

    return (
        <div className={styles.container}>
            <Descriptions
                layout="horizontal"
                style={{ flex: 1 }}
                bordered
                column={1}>
                <Descriptions.Item label="Nombre">
                    <Input
                        placeholder='Nombre del objeto'
                        onChange={handleOnChangeName}
                        value={unsavedSprite?.displayName} />
                </Descriptions.Item>
                <Descriptions.Item label="Descripción">
                    <Input
                        placeholder='Descripción del objeto'
                        onChange={handleOnChangeDescription}
                        value={unsavedSprite?.description} />
                </Descriptions.Item>
                <Descriptions.Item label="Tamaño">
                    <SizeInput
                        unsavedSprite={unsavedSprite}
                        onChangeSize={handleOnChangeSize}
                        onChangeUnit={handleOnChangeUnit} />
                </Descriptions.Item>
                <Descriptions.Item label="Establecer como inicio">
                    <Button
                        type={unsavedSprite?.isIndex ? "primary" : "default"}
                        onClick={() => {
                            setUnsavedSprite({
                                ...unsavedSprite,
                                isIndex: !unsavedSprite?.isIndex
                            });
                        }}>
                        {unsavedSprite?.isIndex ? "Desmarcar como punto de inicio" : "Establecer como punto de inicio"}
                    </Button>
                </Descriptions.Item>
                <Descriptions.Item
                    style={{ height: "10rem" }}
                    label="Imagen principal (.png)">
                    <ImageSelection
                        acceptedFormats={['image/png']}
                        requiredSize={{ width: 1000, height: 1000 }}
                        image={unsavedSprite?.image || null}
                        onSelectImage={(image) => {
                            setUnsavedSprite({
                                ...unsavedSprite,
                                image
                            });
                        }} />
                </Descriptions.Item>
                <Descriptions.Item
                    style={{ height: "10rem" }}
                    label="Fondo opcional (.jpg o .png)">
                    <ImageSelection
                        acceptedFormats={['image/jpeg', 'image/png']}
                        allowDelete
                        requiredSize={{ width: 2160, height: 3840 }}
                        image={unsavedSprite?.background.image || null}
                        onSelectImage={(image) => {
                            setUnsavedSprite({
                                ...unsavedSprite,
                                background: {
                                    ...unsavedSprite.background,
                                    image
                                }
                            });
                        }} />
                </Descriptions.Item>
            </Descriptions>
            <Footer
                onSave={handleOnSave}
                onCreate={handleOnCreate}
                onDelete={handleOnDelete}
            />
        </div>
    );
}

export default SpriteConfiguration;