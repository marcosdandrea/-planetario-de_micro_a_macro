import { Buffer } from "buffer";
import { UnitType } from "./units.type";

export type SpriteType = {
    id: string;
    displayName: string;
    description: string;
    image: string;
    isIndex: boolean;
    base10Size: number;
    unit: UnitType['name'];
    background: {
        image: string;
    };
}

export interface ChunkedImageBuffer {
    filename: string;
    chunk: Buffer;
    currentChunkIndex: number;
    totalChunks: number;
}