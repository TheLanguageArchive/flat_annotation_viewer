import { AnnotationMetadata } from "@fav-models/annotation/metadata";
import { AnnotationHeader } from "@fav-models/annotation/header";
import { AnnotationTimeslot } from '@fav-models/annotation/timeslot';
import { AnnotationTier } from '@fav-models/annotation/tier';

export class AnnotationData {

    metadata: AnnotationMetadata;
    header: AnnotationHeader;
    timeslots: AnnotationTimeslot[];
    tiers: AnnotationTier[];
    currentTier: string;

    constructor(metadata: AnnotationMetadata, header: AnnotationHeader, timeslots: AnnotationTimeslot[], tiers: AnnotationTier[]) {

        this.metadata    = metadata;
        this.header      = header;
        this.timeslots   = timeslots;
        this.tiers       = tiers;
        this.currentTier = this.tiers[0].id;
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

    getTimeslot(id: string): AnnotationTimeslot {
        return this.timeslots.find(timeslot => {
            return timeslot.id === id;
        });
    }

    getDuration(slot1: AnnotationTimeslot, slot2: AnnotationTimeslot) {

        if (slot1.value > slot2.value) {
            return slot1.value - slot2.value;
        } else {
            return slot2.value - slot1.value;
        }
    }
}
