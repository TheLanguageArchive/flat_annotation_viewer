import { Component, OnInit, Input } from '@angular/core';
import { EafRefAnnotation } from '@fav/app/models/eaf/ref-annotation';
import { EafAlignableAnnotation } from '@fav/app/models/eaf/alignable-annotation';
import TimeFormat from 'hh-mm-ss';

@Component({
  selector: 'app-symbolic-subdivision',
  templateUrl: '../../views/table-viewer/symbolic-subdivision.component.html',
  styleUrls: ['../../styles/table-viewer/symbolic-subdivision.component.scss']
})
export class SymbolicSubdivisionComponent implements OnInit {

  @Input() annotation: EafRefAnnotation | EafAlignableAnnotation;

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

  debug() {
    console.log(arguments);
    // Array.from(arguments).forEach(argument => {
    //   console.log(argument);
    // });
  }
}
