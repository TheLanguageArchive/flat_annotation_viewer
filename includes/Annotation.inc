<?php
/**
 * Entity
 *
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package FLAT Annotation Viewer
 */
class FlatAnnotationEntity implements JsonSerializable
{
    /** @var string */
    const ANNOTATION_TYPE_ALIGNABLE = 'alignable';

    /** @var string */
    const ANNOTATION_TYPE_REF       = 'ref';

    /**
     * @var array
     */
    private $metadata;

    /**
     * @var array
     */
    private $header;

    /**
     * @var array
     */
    private $timeslots;

    /**
     * @var array
     */
    private $tiers;

    /**
     * Setting metadata
     *
     * @param string $author
     * @param string $date
     * @param string $format
     * @param string $version
     *
     * @return self
     */
    public function setMetadata($author, $date, $format, $version)
    {
        $this->metadata = [

            'author'  => $author,
            'date'    => new DateTime($date),
            'format'  => $format,
            'version' => $version,
        ];

        return $this;
    }

    /**
     * Setting header
     *
     * @param string $mediafile
     * @param array  $timeunits
     * @param array  $media
     * @param array  $properties
     *
     * @return self
     */
    public function setHeader($mediafile, $timeunits, $media, $properties)
    {
        $this->header = [

            'mediafile'  => $mediafile,
            'timeunits'  => $timeunits,
            'media'      => $media,
            'properties' => $properties,
        ];

        return $this;
    }

    /**
     * Setting time orders
     *
     * @param array $timeslots
     *
     * @return self
     */
    public function setTimeSlots($timeslots)
    {
        $this->timeslots = $timeslots;
        return $this;
    }

    /**
     * Setting tiers
     *
     * @param array $tiers
     *
     * @return self
     */
    public function setTiers($tiers)
    {
        $this->tiers = $tiers;
        return $this;
    }

    /**
     * This method is called when json_encode
     * is called on this object
     *
     * @return array
     */
    public function jsonSerialize()
    {
        $metadata = [

            'author'  => $this->metadata['author'],
            'date'    => $this->metadata['date']->getTimestamp(),
            'format'  => $this->metadata['format'],
            'version' => $this->metadata['version'],
        ];

        return [

            'metadata'  => $metadata,
            'header'    => $this->header,
            'timeslots' => $this->timeslots,
            'tiers'     => $this->tiers,
        ];
    }
}
