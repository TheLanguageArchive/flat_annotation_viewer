import { Component, OnInit, Input } from '@angular/core';
import { EafRefAnnotation } from '@fav-models/eaf/ref-annotation';
import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import TimeFormat from 'hh-mm-ss';

@Component({
  selector: 'app-toplevel',
  templateUrl: '../../views/table-viewer/toplevel.component.html',
  styleUrls: ['../../styles/table-viewer/toplevel.component.scss']
})
export class ToplevelComponent implements OnInit {

  @Input() annotation: EafRefAnnotation | EafAlignableAnnotation;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Formatting duration of an annotation
   *
   * @param duration
   */
  formatDuration(duration: number) {
    return TimeFormat.fromMs(duration, 'hh:mm:ss.sss');
  }
}
