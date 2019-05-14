import { AnnotationData } from '@fav-models/annotation/data';
import { AnnotationMetadata } from '../annotation/metadata';
import { AnnotationHeader } from '../annotation/header';
import { AnnotationMedia } from '../annotation/media';
import { AnnotationProperty } from '../annotation/property';
import { AnnotationTimeslot } from '../annotation/timeslot';
import { Annotation } from '../annotation/annotation';
import { AnnotationTier } from '../annotation/tier';

export function SerializeAnnotationData(data: AnnotationData) {

    let media = [];
    for (let item of data.header.media) {
        media.push(new AnnotationMedia(item.url, item.type, item.relative));
    }

    let properties = [];
    for (let item of data.header.properties) {
       properties.push(new AnnotationProperty(item.name, item.value));
    }

    let metadata  = new AnnotationMetadata(data.metadata.author, data.metadata.date, data.metadata.format, data.metadata.version);
    let header    = new AnnotationHeader(data.header.mediafile, data.header.timeunits, media, properties);

    let timeslots = [];
    for (let item of data.timeslots) {
        timeslots.push(new AnnotationTimeslot(item.id, item.value));
    }

    let tiers = [];
    for (let item of data.tiers) {

        let annotations = [];
        for (let child of item.annotations) {
            annotations.push(new Annotation(child.id, child.type, child.value, child.slotref1, child.slotref2));
        }

        tiers.push(new AnnotationTier(item.id, item.locale, item.typeref, item.parentref, annotations));
    }

    return new AnnotationData(metadata, header, timeslots, tiers);
}
