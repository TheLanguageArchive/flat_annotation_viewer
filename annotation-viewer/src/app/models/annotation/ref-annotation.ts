import { AnnotationTimeslot } from '@fav-models/annotation/timeslot';
import { RefAnnotation } from '@fav-models/annotation/ref-annotation';
import { AlignableAnnotation } from '@fav-models/annotation/alignable-annotation';

export class RefAnnotation {

    id: string;
    type: string;
    value: string;
    ref: RefAnnotation | AlignableAnnotation | null;
    start: AnnotationTimeslot;
    finish: AnnotationTimeslot;

    constructor(id: string, type: string, value: string, slotref1: string, slotref2: string) {

        this.id       = id;
        this.type     = type;
        this.value    = value;
        this.slotref1 = slotref1;
        this.slotref2 = slotref2;
    }
}
