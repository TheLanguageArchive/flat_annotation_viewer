import { Component, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { EafService } from '@fav-services/eaf.service';
import { Eaf } from '@fav-models/eaf';

@Component({
  selector: 'app-table-viewer',
  templateUrl: '../views/table-viewer.component.html',
  styleUrls: ['../styles/table-viewer.component.scss']
})
export class TableViewerComponent implements AfterViewInit {

  @ViewChildren('videoPlayer') videoPlayer: QueryList<HTMLVideoElement>;

  public eaf: Eaf;

  constructor(private eafService: EafService) { }

  ngAfterViewInit() {

    this.eafService
      .fetch()
      .subscribe(eaf => {
        this.eaf = eaf;

        // for (let annotation of eaf.getCurrentTier().annotations) {
        //   console.log(annotation);
        // }
      });

      // let t = setInterval(() => {
      //   console.log('vp', this.videoPlayer);
      //   if (this.videoPlayer) {
      //     clearInterval(t);
      //   }
      // }, 1000);
  }

  debug(data: any) {
      console.debug(data);
  }

  formatDuration(duration: number) {
    return TimeFormat.fromMs(duration, 'hh:mm:ss.sss');
  }

  changeTier(event: Event) {
    this.eaf.setCurrentTier((event.target as HTMLInputElement).value);
  }
}
