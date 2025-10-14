import { SpriteType } from "@common/types/sprite.type"
import { mockupData } from "./muckupData"

export const getSpriteData = async (_args: any, callback: (data: SpriteType[]) => void) => {
    callback?.(mockupData)
}

export default {
    getSpriteData
}