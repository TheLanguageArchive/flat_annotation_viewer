import { EafRefAnnotation } from '@fav/app/models/eaf/ref-annotation';
import { EafAlignableAnnotation } from '@fav/app/models/eaf/alignable-annotation';

export class EafTier {

    id: string;
    locale: string;
    annotations: EafRefAnnotation[] | EafAlignableAnnotation[];
    linguistic_type: string;

    constructor(id: string, locale: string, annotations: EafRefAnnotation[] | EafAlignableAnnotation[], linguistic_type: string) {

        this.id              = id;
        this.locale          = locale;
        this.annotations     = annotations;
        this.linguistic_type = linguistic_type;
    }
}
