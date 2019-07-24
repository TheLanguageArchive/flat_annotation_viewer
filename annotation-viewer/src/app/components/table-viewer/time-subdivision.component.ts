import { Component, OnInit, Input } from '@angular/core';
import { EafRefAnnotation } from '@fav/app/models/eaf/ref-annotation';
import { EafAlignableAnnotation } from '@fav/app/models/eaf/alignable-annotation';
import TimeFormat from 'hh-mm-ss';

@Component({
  selector: 'app-time-subdivision',
  templateUrl: '../../views/table-viewer/time-subdivision.component.html',
  styleUrls: ['../../styles/table-viewer/time-subdivision.component.scss']
})
export class TimeSubdivisionComponent implements OnInit {

  @Input() annotation: EafRefAnnotation | EafAlignableAnnotation;

  ngOnInit() {}

  /**
   * Formatting duration of an annotation
   *
   * @param duration
   */
  formatDuration(duration: number) {
    return TimeFormat.fromMs(duration, 'hh:mm:ss.sss');
  }
}
