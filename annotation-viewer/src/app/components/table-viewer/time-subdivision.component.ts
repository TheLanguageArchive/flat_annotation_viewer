import { Component, OnInit, Input } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { EafTimeslot } from '@fav-models/eaf/timeslot';
import { EafStore } from '@fav-stores/eaf-store';

@Component({
  selector: 'app-time-subdivision',
  templateUrl: '../../views/table-viewer/time-subdivision.component.html',
  styleUrls: ['../../styles/table-viewer/time-subdivision.component.scss']
})
export class TimeSubdivisionComponent implements OnInit {

  @Input() id: string;
  @Input() row: string;

  constructor(private eafStore: EafStore) {}

  ngOnInit() {}

  /**
   * Formatting duration of an annotation
   *
   * @param duration
   */
  formatDuration(duration: number) {
    return TimeFormat.fromMs(duration, 'hh:mm:ss.sss');
  }

  getDuration(start: EafTimeslot, end: EafTimeslot) {

      if (start.time > end.time) {
          return start.time - end.time;
      } else {
          return end.time - start.time;
      }
  }
}
