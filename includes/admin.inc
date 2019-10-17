<?php
/**
 * FLAT Annotation Viewer Admin Form
 *
 * @param array $form
 * @param array $form_state
 *
 * @return array
 */
function flat_annotation_viewer_admin_form($form, &$form_state) {

    $form['general'] = [

        '#type'           => 'fieldset',
        '#title'          => t('FLAT Annotation Viewer'),
        'show_timestamps' => [

            '#type'          => 'checkbox',
            '#title'         => t('Show timestamps'),
            '#default_value' => variable_get('flat_annotation_viewer_show_timestamps', FLAT_ANNOTATION_VIEWER_DEFAULT_SHOW_TIMESTAMPS) == 1,
            '#help_text'     => 'Check box whether to show or hide timestamps in annotation viewer',
        ],

        'width' => [

            '#type'          => 'textfield',
            '#title'         => t('Width'),
            '#default_value' => variable_get('flat_annotation_viewer_width', FLAT_ANNOTATION_VIEWER_DEFAULT_WIDTH),
            '#help_text'     => 'Width in percentage of the annotation viewer',
        ],

        'height' => [

            '#type'          => 'textfield',
            '#title'         => t('Height'),
            '#default_value' => variable_get('flat_annotation_viewer_height', FLAT_ANNOTATION_VIEWER_DEFAULT_HEIGHT),
            '#help_text'     => 'Height in percentage of the annotation viewer',
        ],
    ];

    $form['actions'] = [

        '#type'  => 'actions',
        'submit' => [

            '#type'   => 'submit',
            '#value'  => t('Save Configuration'),
            '#weight' => 0,
            '#submit' => ['flat_annotation_viewer_admin_form_submit'],
        ],
        'reset'  => [

            '#type'   => 'submit',
            '#value'  => t('Reset to defaults'),
            '#weight' => 1,
            '#submit' => ['flat_annotation_viewer_admin_form_submit'],
        ],
    ];

    return $form;
}

/**
 * Admin form submit handler
 *
 * @param array $form
 * @param array $form_state
 *
 * @return void
 */
function flat_annotation_viewer_admin_form_submit($form, &$form_state) {

    if ($form_state['triggering_element']['#value'] == t('Reset to defaults')) {

        $form_state['redirect'] = 'admin/config/flat_deposit/flat_annotation_viewer';

        variable_set('flat_annotation_viewer_show_timestamps', FLAT_ANNOTATION_VIEWER_DEFAULT_SHOW_TIMESTAMPS);
        variable_set('flat_annotation_viewer_width', FLAT_ANNOTATION_VIEWER_DEFAULT_WIDTH);
        variable_set('flat_annotation_viewer_height', FLAT_ANNOTATION_VIEWER_DEFAULT_HEIGHT);

        drupal_set_message(t('FLAT Annotation Viewer admin configuration was successfully reset to defaults'));

    } else {

        variable_set('flat_annotation_viewer_show_timestamps', $form_state['values']['show_timestamps']);
        variable_set('flat_annotation_viewer_width', $form_state['values']['width']);
        variable_set('flat_annotation_viewer_height', $form_state['values']['height']);

        drupal_set_message(t('FLAT Annotation Viewer admin configuration was successfully saved'));
    }
}
