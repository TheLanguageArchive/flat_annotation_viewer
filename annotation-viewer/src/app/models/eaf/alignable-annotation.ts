import { EafTimeslot } from "@fav-models/eaf/timeslot";

export class EafAlignableAnnotation {

    id: string;
    type: string;
    value: string;
    start: EafTimeslot;
    end: EafTimeslot;

    constructor(id: string, type: string, value: string, start: EafTimeslot, end: EafTimeslot) {

        this.id    = id;
        this.type  = type;
        this.value = value;
        this.start = start;
        this.end   = end;
    }
}
