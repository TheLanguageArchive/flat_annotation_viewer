<?php
/**
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package FLAT Annotation Viewer
 */
class NewParser
{
    /** @var string */
    const ANNOTATION_TYPE_ALIGNABLE = 'alignable';

    /** @var string */
    const ANNOTATION_TYPE_REF       = 'ref';

    /**
     * @var string
     */
    private $file;

    /**
     * Constructor
     *
     * @param string $file
     */
    public function __construct($file)
    {
        $this->file = $file;
    }

    /**
     * Parsing annotations file
     *
     * @return array
     */
    public function parse()
    {
        $contents   = simplexml_load_file($this->file);
        $attributes = $contents->attributes();

        return [

            'metadata'  => $this->parseMetadata($contents),
            'header'    => $this->parseHeader($contents->HEADER),
            'timeslots' => $this->parseTimeslots($contents->TIME_ORDER->TIME_SLOT),
            'tiers'     => $this->parseTiers($contents->TIER),
        ];
    }

    /**
     * Parse metadata
     *
     * @param SimpleXMLElement $contents
     *
     * @return array
     */
    private function parseMetadata(SimpleXMLElement $contents)
    {
        $attributes = $contents->attributes();

        return [

            'author'  => (string)$attributes['AUTHOR'],
            'date'    => (new DateTime((string)$attributes['DATE']))->getTimestamp(),
            'format'  => (string)$attributes['FORMAT'],
            'version' => (string)$attributes['VERSION'],
        ];
    }

    /**
     * Parse header
     *
     * @param SimpleXMLElement $header
     *
     * @return array
     */
    private function parseHeader(SimpleXMLElement $header)
    {
        $attributes = $header->attributes();

        return [

            'mediafile'  => (string)$attributes['MEDIA_FILE'],
            'timeunits'  => (string)$attributes['TIME_UNITS'],
            'media'      => $this->parseMedia($header->MEDIA_DESCRIPTOR),
            'properties' => $this->parseProperties($header->PROPERTY),
        ];
    }

    /**
     * Parse media
     *
     * @param SimpleXMLElement $items
     *
     * @return array
     */
    private function parseMedia(SimpleXMLElement $items)
    {
        $media = [];

        foreach ($items as $item) {

            $attributes = $item->attributes();

            $media[] = [

                'url'      => (string)$attributes['MEDIA_URL'],
                'type'     => (string)$attributes['MIME_TYPE'],
                'relative' => (string)$attributes['RELATIVE_MEDIA_URL'],
            ];
        }

        return $media;
    }

    /**
     * Parse properties
     *
     * @param SimpleXMLElement $items
     *
     * @return array
     */
    private function parseProperties(SimpleXMLElement $items)
    {
        $properties = [];

        foreach ($items as $item) {

            $properties[] = [

                'name'  => (string)$item->attributes()['NAME'],
                'value' => (string)$item,
            ];
        }

        return $properties;
    }

    /**
     * Parse timeslots
     *
     * @param SimpleXMLElement $timeslots
     *
     * @return array
     */
    private function parseTimeslots(SimpleXMLElement $items)
    {
        $timeslots = [];

        foreach ($items as $item) {

            $attributes     = $item->attributes();
            $id             = (string)$attributes['TIME_SLOT_ID'];
            $timeslots[$id] = [

                'id'    => $id,
                'value' => isset($attributes['TIME_VALUE']) ? (int)$attributes['TIME_VALUE'] : null,
            ];
        }

        return $timeslots;
    }

    /**
     * Parse tiers
     *
     * @param SimpleXMLElement $items
     *
     * @return array
     */
    private function parseTiers(SimpleXMLElement $items)
    {
        $tiers = [];

        foreach ($items as $item) {

            $attributes = $item->attributes();
            $id         = (string)$attributes['TIER_ID'];
            $tiers[$id] = [

                'id'          => $id,
                'locale'      => (string)$attributes['DEFAULT_LOCALE'],
                'typeref'     => (string)$attributes['LINGUISTIC_TYPE_REF'],
                'parentref'   => isset($attributes['PARENT_REF']) ? (string)$attributes['PARENT_REF'] : null,
                'annotations' => $this->parseAnnotations($item->ANNOTATION),
            ];
        }

        return $tiers;
    }

    /**
     * Parse annotations
     *
     * @param SimpleXMLElement $items
     *
     * @return array
     */
    private function parseAnnotations(SimpleXMLElement $items)
    {
        $annotations = [];

        foreach ($items as $item) {

            $type = $this->determineAnnotationType($item);

            if (self::ANNOTATION_TYPE_ALIGNABLE === $type) {

                $annotation = $this->parseAlignableAnnotation($item->ALIGNABLE_ANNOTATION);
                $annotations[$annotation['id']] = $annotation;

            } elseif (self::ANNOTATION_TYPE_REF === $type) {

                $annotation = $this->parseRefAnnotation($item->REF_ANNOTATION);
                $annotations[$annotation['id']] = $annotation;
            }
        }

        return $annotations;
    }

    /**
     * Determine annotation type
     *
     * @param SimpleXMLElement $annotation
     *
     * @return string
     */
    private function determineAnnotationType(SimpleXMLElement $annotation)
    {
        $type = false;
        switch (true) {

            case isset($annotation->ALIGNABLE_ANNOTATION):
                $type = self::ANNOTATION_TYPE_ALIGNABLE;
                break;

            case isset($annotation->REF_ANNOTATION):
                $type = self::ANNOTATION_TYPE_REF;
                break;
        }

        return $type;
    }

    /**
     * Parse alignable annotation
     *
     * @param SimpleXMLElement $annotation
     *
     * @return array
     */
    private function parseAlignableAnnotation(SimpleXMLElement $annotation)
    {
        $attributes = $annotation->attributes();

        return [

            'type'  => self::ANNOTATION_TYPE_ALIGNABLE,
            'id'    => (string)$attributes['ANNOTATION_ID'],
            'value' => (string)$annotation->ANNOTATION_VALUE,
            'start' => (string)$attributes['TIME_SLOT_REF1'],
            'end'   => (string)$attributes['TIME_SLOT_REF2'],
        ];
    }

    /**
     * Parse ref annotation
     *
     * @param SimpleXMLElement $annotation
     *
     * @return array
     */
    private function parseRefAnnotation(SimpleXMLElement $annotation)
    {
        $attributes = $annotation->attributes();

        return [

            'type'  => self::ANNOTATION_TYPE_REF,
            'id'    => (string)$attributes['ANNOTATION_ID'],
            'value' => (string)$annotation->ANNOTATION_VALUE,
            'ref'   => (string)$attributes['ANNOTATION_REF'],
        ];
    }
}
