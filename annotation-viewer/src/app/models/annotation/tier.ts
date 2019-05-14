import { Annotation } from '@fav-models/annotation/annotation';

export class AnnotationTier {

    id: string;
    locale: string;
    typeref: string;
    parentref: string | null;
    annotations: Annotation[];

    constructor(id: string, locale: string, typeref: string, parentref: string | null, annotations: Annotation[]) {

        this.id          = id;
        this.locale      = locale;
        this.typeref     = typeref;
        this.parentref   = parentref;
        this.annotations = annotations;
    }
}
