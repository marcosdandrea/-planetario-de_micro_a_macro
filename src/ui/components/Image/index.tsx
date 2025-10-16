import React from 'react';

interface ImageProps {
    src: string;
    width: number;
    height: number;
}

const Image = React.memo(({ src, width, height }: ImageProps) => {
    return <img 
        src={src} 
        alt="" 
        width={"auto"} 
        height={height} />;
});

Image.displayName = 'Image';
 
export default Image;