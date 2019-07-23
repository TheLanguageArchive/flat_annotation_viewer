import { Eaf } from '@fav-models/eaf';
import { EafMetadata } from '@fav-models/eaf/metadata';
import { EafHeader } from '@fav-models/eaf/header';
import { EafMedia } from '@fav-models/eaf/media';
import { EafProperty } from '@fav-models/eaf/property';
import { EafTimeslot } from '@fav-models/eaf/timeslot';
import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import { EafRefAnnotation } from '@fav-models/eaf/ref-annotation';
import { EafTier } from '@fav-models/eaf/tier';

export function SerializeEaf(eaf: Eaf) {

    let media = [];
    for (let item of eaf.header.media) {
        media.push(new EafMedia(item.url, item.mimetype, item.relative));
    }

    let properties = [];
    for (let item of eaf.header.properties) {
       properties.push(new EafProperty(item.name, item.value));
    }

    let metadata  = new EafMetadata(eaf.metadata.author, eaf.metadata.date, eaf.metadata.format, eaf.metadata.version);
    let header    = new EafHeader(eaf.header.mediafile, eaf.header.timeunits, media, properties);

    let timeslots = [];
    for (let item of eaf.timeslots) {
        timeslots.push(new EafTimeslot(item.id, item.time));
    }

    let tiers = [];
    for (let item of eaf.tiers) {

        let annotations = [];
        for (let annotation of item.annotations) {

            if (annotation.type === 'alignable') {

                annotation = (annotation as EafAlignableAnnotation);
                annotations.push(new EafAlignableAnnotation(annotation.id, annotation.type, annotation.value, annotation.start, annotation.end));

            } else {

                annotation = (annotation as EafRefAnnotation);
                annotations.push(new EafRefAnnotation(annotation.id, annotation.type, annotation.value, annotation.ref, annotation.referenced_annotation, annotation.previous, annotation.previous_annotation, annotation.custom_start, annotation.custom_end));
            }
        }

        tiers.push(new EafTier(item.id, item.locale, annotations, item.linguistic_type));
    }

    return new Eaf(metadata, header, timeslots, tiers);
}
