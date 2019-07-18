import { EafMetadata } from "@fav-models/eaf/metadata";
import { EafHeader } from "@fav-models/eaf/header";
import { EafTimeslot } from '@fav-models/eaf/timeslot';
import { EafTier } from '@fav-models/eaf/tier';

export class Eaf {

    metadata: EafMetadata;
    header: EafHeader;
    timeslots: EafTimeslot[];
    tiers: EafTier[];
    currentTier: string;

    constructor(metadata: EafMetadata, header: EafHeader, timeslots: EafTimeslot[], tiers: EafTier[]) {

        this.metadata    = metadata;
        this.header      = header;
        this.timeslots   = timeslots;
        this.tiers       = tiers;
        this.currentTier = this.tiers[8].id;
    }

    setCurrentTier(id: string) {
        this.currentTier = id;
    }

    getCurrentTier() {

        let current = null;

        this.tiers.forEach(tier => {
            if (tier.id === this.currentTier) {
                current = tier;
            }
        });

        return current;
    }

    getTimeslot(id: string): EafTimeslot {
        return this.timeslots.find(timeslot => {
            return timeslot.id === id;
        });
    }

    getDuration(start: EafTimeslot, end: EafTimeslot) {

        if (start.time > end.time) {
            return start.time - end.time;
        } else {
            return end.time - start.time;
        }
    }
}
