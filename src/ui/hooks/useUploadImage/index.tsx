import { SocketContext } from "@contexts/socket";
import { useContext, useEffect, useState } from "react";
import { ChunkedImageBuffer } from "@common/types/sprite.type";
import { Buffer } from "buffer";
import { requests } from "@common/ipcRequests";

const useUploadImage = () => {
    const { socket } = useContext(SocketContext)
    const [file, uploadImage] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [filename, setFilename] = useState<string | null>(null);


    useEffect(() => {
        if (!file || !socket) return;

        setError(null);
        setProgress(0);
        if (!file?.name){
            setError("El archivo que se intenta subir no es válido.");
            return;
        }
        const chunkSize = 64 * 1024; // 64KB
        const totalChunks = Math.ceil(file.size / chunkSize);
        let currentChunkIndex = 0;
        const reader = new FileReader();

        reader.onload = (e) => {
            if (!e.target?.result) return;
            const arrayBuffer = e.target.result as ArrayBuffer;
            const buffer = Buffer.from(arrayBuffer);

            const sendChunk = () => {
                const chunk = buffer.slice(currentChunkIndex * chunkSize, (currentChunkIndex + 1) * chunkSize);
                const chunkedBuffer: ChunkedImageBuffer = {
                    filename: file.name,
                    chunk: chunk,
                    currentChunkIndex: currentChunkIndex,
                    totalChunks: totalChunks,
                };
                socket.emit(requests.uploadSpriteImage, chunkedBuffer, (ack) => {
                    if (ack.error) {
                        console.error("Error al subir la imagen:", ack.error);
                        return;
                    }
                    currentChunkIndex++;
                    setProgress(Math.round((currentChunkIndex / totalChunks) * 100));
                    if (currentChunkIndex < totalChunks) {
                        sendChunk();
                    } else {
                        setFilename(ack.filename);
                        setProgress(100);
                        uploadImage(null);
                    }
                });
            };
            sendChunk();
        };
        reader.readAsArrayBuffer(file);
    }, [file, socket]);

    return { uploadImage, progress, error, filename };
}

export default useUploadImage;