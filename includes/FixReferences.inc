<?php
/**
 * @author  Ibrahim Abdullah <ibrahim.abdullah@mpi.nl>
 * @package FLAT Annotation Viewer
 */
class FixReferences
{
    /** @var string */
    const ANNOTATION_TYPE_ALIGNABLE = 'alignable';

    /** @var string */
    const ANNOTATION_TYPE_REF       = 'ref';

    /**
     * @var array
     */
    private $data;

    /**
     * @var array
     */
    private $unwound;

    /**
     * @var array
     */
    private $accommodations;

    /**
     * @var int
     */
    private $i = 0;

    /**
     * Constructor
     *
     * @param array $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Fixing references
     *
     * @return array
     */
    public function fix()
    {
        $this->unwindAnnotations();
        $this->fixReferences();

        return $this->annotations;
    }

    /**
     * Unwinding annotations to make references easier
     *
     * @return array
     */
    private function unwindAnnotations()
    {
        $this->unwound = [];

        foreach ($this->data['tiers'] as $tier) {

            foreach ($tier['annotations'] as $annotation) {
                $this->unwound[$annotation['id']] = $annotation;
            }
        }
    }

    /**
     * Fix annotation references
     *
     * @return array
     */
    private function fixReferences()
    {
        $this->annotations = [];
        foreach ($this->unwound as $annotation) {
            $this->annotations[$annotation['id']] = $this->fixAnnotationReferences($annotation);
        }
    }

    /**
     * Fixing annotation references
     *
     * @param array $annotation
     *
     * @return array
     */
    private function fixAnnotationReferences(array $annotation)
    {
        if (self::ANNOTATION_TYPE_REF === $annotation['type']) {
            return $this->fixRefAnnotationReferences($annotation);
        }

        if (self::ANNOTATION_TYPE_ALIGNABLE === $annotation['type']) {
            return $this->fixAlignableAnnotationReferences($annotation);
        }

        return $annotation;
    }

    /**
     * Fix ref annotation references
     *
     * @param array $annotation
     *
     * @return array
     */
    private function fixRefAnnotationReferences(array $annotation)
    {
        if (isset($annotation['ref']) && isset($this->unwound[$annotation['ref']])) {

            if (self::ANNOTATION_TYPE_ALIGNABLE === $this->unwound[$annotation['ref']]['type']) {
                $annotation['ref'] = $this->fixAlignableAnnotationReferences($this->unwound[$annotation['ref']]);
            } else {
                $annotation['ref'] = $this->findAlignableAnnotationRef($this->unwound[$annotation['ref']]);
            }
        }

        return $annotation;
    }

    /**
     * Finding alignable annotation ref
     *
     * @param array $annotation
     *
     * @return array
     */
    private function findAlignableAnnotationRef(array $annotation)
    {
        if (self::ANNOTATION_TYPE_REF === $annotation['type'] && isset($annotation['ref']) && isset($this->unwound[$annotation['ref']])) {
            return $this->findAlignableAnnotationRef($this->unwound[$annotation['ref']]);
        }

        return $this->fixAlignableAnnotationReferences($annotation);
    }

    /**
     * Fix alignable annotation references
     *
     * @param array $annotation
     *
     * @return array
     */
    private function fixAlignableAnnotationReferences(array $annotation)
    {
        if (isset($annotation['start']) && isset($this->data['timeslots'][$annotation['start']])) {
            $annotation['start'] = $this->data['timeslots'][$annotation['start']];
        }

        if (isset($annotation['end']) && isset($this->data['timeslots'][$annotation['end']])) {
            $annotation['end'] = $this->data['timeslots'][$annotation['end']];
        }

        return $annotation;
    }
}
