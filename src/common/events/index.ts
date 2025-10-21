import { eventsType } from "@common/types/events.types";

export const events = {
    spriteCreated: 'spriteCreated',
    spriteUpdated: 'spriteUpdated',
    spriteDeleted: 'spriteDeleted',
} as Record<string, eventsType>;