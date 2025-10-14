import { UnitType } from "./units.type";

export type SpriteType = {
    id: string;
    displayName?: string;
    description?: string;
    displaySize?: string;
    image: string;
    isIndex?: boolean;
    base10Size: number;
    unit: UnitType['name'];
}