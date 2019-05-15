export class AlignableAnnotation {

    id: string;
    type: string;
    value: string;
    slotref1: string;
    slotref2: string;

    constructor(id: string, type: string, value: string, slotref1: string, slotref2: string) {

        this.id       = id;
        this.type     = type;
        this.value    = value;
        this.slotref1 = slotref1;
        this.slotref2 = slotref2;
    }
}
