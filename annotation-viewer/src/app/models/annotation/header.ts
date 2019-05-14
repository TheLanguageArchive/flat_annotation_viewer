import { AnnotationMedia } from "@fav-models/annotation/media";
import { AnnotationProperty } from "@fav-models/annotation/property";

export class AnnotationHeader {

    mediafile: string;
    timeunits: string;
    media: AnnotationMedia[];
    properties: AnnotationProperty[];

    constructor(mediafile: string, timeunits: string, media: AnnotationMedia[], properties: AnnotationProperty[]) {

        this.mediafile  = mediafile;
        this.timeunits  = timeunits;
        this.media      = media;
        this.properties = properties;
    }
}
