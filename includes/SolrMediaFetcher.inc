<?php
/**
 * Solr Sibling Fetcher
 *
 * @author  Ibrahim Abdullah
 * @package Flat Permissions
 */
class SolrMediaFetcher
{
    /**
     * @var Apache_Solr_Service
     */
    private $solr;

    /**
     * Connect to apache solr
     *
     * @return Apache_Solr_Service
     */
    public function connect()
    {
        if (null !== $this->solr) {
            return $this->solr;
        }

        $path_parts = parse_url(variable_get('islandora_solr_url', 'localhost:8080/solr'));

        $this->solr = new Apache_Solr_Service($path_parts['host'], $path_parts['port'], $path_parts['path'] . '/');
        $this->solr->setCreateDocuments(0);

        return $this->solr;
    }

    /**
     * Common solr query performer
     *
     * @param string $query
     * @param array $params
     *
     * @return array
     */
    public function query($query, $params = [])
    {
        $this->connect();

        try {

            $results    = $this->solr->search($query, 0, 1000, $params);

        } catch (Exception $e) {

            drupal_set_message(check_plain(t('Error searching Solr index')) . ' ' . $e->getMessage(), 'error');
            return false;
        }

        return json_decode($results->getRawResponse(), true);
    }

    /**
     * Fetching parent pid
     *
     * @param string $child
     *
     * @return string
     */
    public function getParentPid($child)
    {
        $data   = $this->query($this->parentQuery($child), $this->parentParams());
        $parent = $child;

        foreach ($data['response']['docs'] as $doc) {

            if (!isset($doc['RELS_EXT_isConstituentOf_uri_ms'])) {
                continue;
            }

            $parent = array_map([$this, 'removeFedoraPrefix'], $doc['RELS_EXT_isConstituentOf_uri_ms']);
            $parent = current($parent);
        }

        return $parent;
    }

    /**
     * Get parent query
     *
     * @param string $child
     *
     * @return string
     */
    public function parentQuery($child)
    {
        return format_string('!pid_field:("info:fedora/!pid" OR "!pid")', [

            '!pid_field' => 'PID',
            '!pid'       => $child,
        ]);
    }

    /**
     * Parent params
     *
     * @return array
     */
    public function parentParams()
    {
        return [
            'fl' => [
                'PID, fgs_label_s, RELS_EXT_isConstituentOf_uri_ms',
            ],
        ];
    }

    /**
     * Fetching gallery items from solr
     *
     * @param string $parent
     *
     * @return array
     */
    public function fetch($pid)
    {
        $parent = $this->getParentPid($pid);
        $data   = $this->query($this->childrenQuery($parent), $this->childrenParams($parent));
        $items  = ['pid' => $parent, 'accessible' => false, 'locations' => [], 'annotation' => null];

        foreach ($data['response']['docs'] as $doc) {

            $models = array_map([$this, 'removeFedoraPrefix'], $doc['RELS_EXT_hasModel_uri_ms']);

            if (in_array('islandora:sp_videoCModel', $models)) {

                $object     = islandora_object_load($doc['PID']);
                $datastream = false;

                if (isset($object['OBJ'])/* && islandora_datastream_access(ISLANDORA_VIEW_OBJECTS, $object['OBJ'])*/) {
                    $datastream = 'OBJ';
                }

                if (isset($object['MP4'])/* && islandora_datastream_access(ISLANDORA_VIEW_OBJECTS, $object['MP4'])*/) {
                    $datastream = 'MP4';
                }

                if (false !== $datastream) {
                    $items['locations'][$doc['fgs_label_s']] = url(format_string('islandora/object/!pid/datastream/!datastream/view', ['!pid' => $doc['PID'], '!datastream' => $datastream]));
                }
            }

            if (in_array('flat:annotation_viewer', $models)) {

                $object     = islandora_object_load($doc['PID']);
                $accessible = islandora_datastream_access(ISLANDORA_VIEW_OBJECTS, $object['OBJ']);

                $items['accessible'] = $accessible;
                $items['annotation'] = simplexml_load_string($object->getDatastream('OBJ')->content);
            }
        }

        return $items;
    }

    /**
     * Children query
     *
     * @param string $parent
     *
     * @return string
     */
    public function childrenQuery($parent)
    {
        return format_string('!constituent_field:("info:fedora/!pid" OR "!pid")', [

            '!pid'               => $parent,
            '!constituent_field' => 'RELS_EXT_isConstituentOf_uri_ms',
        ]);
    }

    /**
     * Building children params
     *
     * @param string $parent
     *
     * @return array
     */
    public function childrenParams($parent)
    {
        global $user;

        $params = [

            'fq' => [

                0 => 'RELS_EXT_hasModel_uri_ms:("info:fedora/islandora:sp_videoCModel" OR "islandora:sp_videoCModel" OR "info:fedora/flat:annotation_viewer" OR "flat:annotation_viewer")',
                1 => 'policy_datastream_users_ms:"' . $user->name . '"
                        OR (
                            (*:* -policy_datastream_users_ms:[* TO *]) AND (*:* -policy_datastream_roles_ms:[* TO *])
                        )',
            ],
        ];

        foreach ($user->roles as $role) {
            $params['fq'][1] .= ' OR (policy_datastream_roles_ms:"' . $role . '") ';
        }

        $params['fl'][]  = 'PID, fgs_label_s, RELS_EXT_hasModel_uri_ms';
        $params['sort']  = variable_get('islandora_solr_object_label_field', 'fgs_label_s') . ' asc';

        return $params;
    }

    /**
     * Removing fedora prefix from models to allow uniform
     * checking of models in rest of module
     *
     * @return string
     */
    private function removeFedoraPrefix($string)
    {
        return str_replace('info:fedora/', '', $string);
    }
}
