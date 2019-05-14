<?php
/**
 * Flat Annotation Parser
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package FLAT Annotation Viewer
 */
class FlatAnnotationParser
{
    /**
     * @var string
     */
    private $file;

    /**
     * Constructor
     *
     * @param string $file
     */
    public function __construct(string $file)
    {
        $this->file = $file;
    }

    /**
     * Parsing annotations
     *
     * @return FlatAnnotationEntity
     */
    public function parse()
    {
        $contents = simplexml_load_file($this->file);

        $entity = new FlatAnnotationEntity();

        $attributes = $contents->attributes();
        $entity->setMetadata((string)$attributes['AUTHOR'], (string)$attributes['DATE'], (string)$attributes['FORMAT'], (string)$attributes['VERSION']);

        $header     = $contents->HEADER;
        $media      = [];
        $properties = [];
        $timeslots  = [];
        $tiers      = [];

        foreach ($header->MEDIA_DESCRIPTOR as $item) {

            $attributes = $item->attributes();

            $media[] = [

                'url'      => (string)$attributes['MEDIA_URL'],
                'type'     => (string)$attributes['MIME_TYPE'],
                'relative' => (string)$attributes['RELATIVE_MEDIA_URL'],
            ];
        }

        foreach ($header->PROPERTY as $item) {

            $properties[] = [

                'name'  => (string)$item->attributes()['NAME'],
                'value' => (string)$item,
            ];
        }

        $attributes = $header->attributes();
        $entity->setHeader((string)$attributes['MEDIA_FILE'], (string)$attributes['TIME_UNITS'], $media, $properties);

        foreach ($contents->TIME_ORDER->TIME_SLOT as $slot) {

            $attributes  = $slot->attributes();
            $timeslots[] = [

                'id'    => (string)$attributes['TIME_SLOT_ID'],
                'value' => isset($attributes['TIME_VALUE']) ? (int)$attributes['TIME_VALUE'] : null,
            ];
        }

        $entity->setTimeSlots($timeslots);

        foreach ($contents->TIER as $tier) {

            $attributes = $tier->attributes();

            $item = [

                'id'          => (string)$attributes['TIER_ID'],
                'locale'      => (string)$attributes['DEFAULT_LOCALE'],
                'typeref'     => (string)$attributes['LINGUISTIC_TYPE_REF'],
                'parentref'   => isset($attributes['PARENT_REF']) ? (string)$attributes['PARENT_REF'] : null,
                'annotations' => [],
            ];

            foreach ($tier->ANNOTATION as $child) {

                $type = $this->determineAnnotationType($child);

                if ($type === FlatAnnotationEntity::ANNOTATION_TYPE_ALIGNABLE) {

                    $attributes = $child->ALIGNABLE_ANNOTATION->attributes();
                    $item['annotations'][] = [

                        'type'     => $type,
                        'id'       => (string)$attributes['ANNOTATION_ID'],
                        'value'    => (string)$child->ALIGNABLE_ANNOTATION->ANNOTATION_VALUE,
                        'slotref1' => (string)$attributes['TIME_SLOT_REF1'],
                        'slotref2' => (string)$attributes['TIME_SLOT_REF2'],
                    ];

                } elseif ($type === FlatAnnotationEntity::ANNOTATION_TYPE_REF) {

                    $attributes = $child->REF_ANNOTATION->attributes();
                    $item['annotations'][] = [

                        'type'  => $type,
                        'id'    => (string)$attributes['ANNOTATION_ID'],
                        'value' => (string)$child->REF_ANNOTATION->ANNOTATION_VALUE,
                        'ref'   => (string)$attributes['ANNOTATION_REF'],
                    ];
                }
            }

            $tiers[] = $item;
        }

        $entity->setTiers($tiers);

        return $entity;
    }

    public function determineAnnotationType($annotation)
    {
        $type = false;
        switch (true) {

            case isset($annotation->ALIGNABLE_ANNOTATION):
                $type = FlatAnnotationEntity::ANNOTATION_TYPE_ALIGNABLE;
                break;

            case isset($annotation->REF_ANNOTATION):
                $type = FlatAnnotationEntity::ANNOTATION_TYPE_REF;
                break;
        }

        return $type;
    }
}
