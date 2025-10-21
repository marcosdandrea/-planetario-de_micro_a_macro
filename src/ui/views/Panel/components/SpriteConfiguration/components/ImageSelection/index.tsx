import React, { useEffect } from 'react';
import { Button, Input, message, Progress, Upload } from 'antd';
import styles from './style.module.css';
import ImageView from '../ImageView';
import useUploadImage from '@hooks/useUploadImage';

const ImageSelection = ({ image, onSelectImage, requiredSize, allowDelete, acceptedFormats }: { image: string; onSelectImage: (image: string) => void; requiredSize: { width: number; height: number }; allowDelete?: boolean; acceptedFormats: string[] }) => {

    const imageWidth = requiredSize.width;
    const imageHeight = requiredSize.height;

    const { uploadImage, progress, error, filename } = useUploadImage()

    const [selectedImage, setSelectedImage] = React.useState(image || null);
    const [imageStatus, setImageStatus] = React.useState<"" | "warning" | "error">("");

    React.useEffect(() => {
        setImageStatus("");
        setSelectedImage(image || null);
    }, [image]);


    useEffect(() => {
        if (error) {
            setImageStatus("error");
            message.error(`Error al subir la imagen: ${error}`);
        } else if (progress === 100) {
            setImageStatus("");
            setSelectedImage(image || filename);
            onSelectImage && onSelectImage(filename!);
            message.success("Imagen subida correctamente");
        }
    }, [error, progress, filename]);

    const testImage = (imageSource) => {
        return new Promise((resolve, reject) => {

            const reader = new FileReader();
            reader.onload = (e) => {
                if (!e.target?.result) {
                    reject(new Error("Error al leer la imagen"));
                    return;
                }
                const img = new Image();
                img.onload = () => {
                    if (img.width !== imageWidth || img.height !== imageHeight) {
                        reject(new Error(`La imagen debe tener un tamaño de ${imageWidth}x${imageHeight} píxeles.`));
                    } else {
                        resolve(true);
                    }
                };
                img.onerror = () => {
                    reject(new Error("Error al cargar la imagen"));
                };
                img.src = e.target.result as string;
            };
            reader.readAsDataURL(imageSource);
        });
    }

    const handleOnSelectImage = async (image: File) => {
        try {

            console.log(image)
            // Testear la imagen
            await testImage(image);
            uploadImage(image);
        } catch (error) {
            message.error(`Error al subir la imagen: ${error.message}`);
            setImageStatus("error");
        }
    }

    return (<div className={styles.imageProperty}>

        <div className={styles.imageSelection}>
            <Input
                status={imageStatus}
                style={{ flex: 1, userSelect: "none", pointerEvents: "none" }}
                value={imageStatus ? "" : selectedImage} />
            <div style={{ display: "flex", columnGap: "1rem" }}>
                <Upload
                    accept={acceptedFormats.join(",")}
                    showUploadList={false}
                    beforeUpload={handleOnSelectImage}>
                    <Button>Seleccionar imagen</Button>
                </Upload>
                {allowDelete && 
                    <Button
                        danger
                        disabled={!selectedImage}
                        type="text"
                        onClick={() => {
                            setSelectedImage(null);
                            onSelectImage && onSelectImage(null);
                        }}>
                        Eliminar
                    </Button>
                }
            </div>
        </div>
        <ImageView image={selectedImage}>
            {
                progress > 0 && progress < 100 &&
                <div className={styles.progressContainer}>
                    <Progress
                        size={70}
                        type='circle'
                        percent={progress}
                        status={imageStatus === "error"
                            ? "exception"
                            : "active"}
                    />
                </div>
            }
        </ImageView>
    </div>);
}

export default ImageSelection