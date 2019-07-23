import { Component, OnInit } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { EafService } from '@fav-services/eaf.service';
import { Eaf } from '@fav-models/eaf';
import { VideoComponent } from '@fav-components/video.component';

@Component({
  selector: 'app-table-viewer',
  templateUrl: '../views/table-viewer.component.html',
  styleUrls: ['../styles/table-viewer.component.scss']
})
export class TableViewerComponent implements OnInit {

  public activeIds: string[];
  public eaf: Eaf;

  constructor(private eafService: EafService) { }

  ngOnInit() {

    this.eafService
      .fetch()
      .subscribe(eaf => {

        this.eaf       = eaf;
        this.activeIds = [eaf.getCurrentTier().annotations[0].id];
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

  progressTracker(currentTime: number) {

    let activeIds = [];
    for (let annotation of this.eaf.getCurrentTier().annotations) {

      if (annotation.type === 'ref' && annotation.custom_start != null) {

        if (currentTime >= annotation.custom_start.time && currentTime <= annotation.custom_end.time) {
          activeIds.push(annotation.id);
        }
      }

      if (annotation.type === 'ref' && annotation.custom_start == null) {

        if (currentTime >= annotation.referenced_annotation.start.time && currentTime <= annotation.referenced_annotation.end.time) {
          activeIds.push(annotation.id);
        }
      }

      if (annotation.type === 'alignable') {

        if (currentTime >= annotation.start.time && currentTime <= annotation.end.time) {
          activeIds.push(annotation.id);
        }
      }
    }

    this.activeIds = activeIds;
  }

  formatDuration(duration: number) {
    return TimeFormat.fromMs(duration, 'hh:mm:ss.sss');
  }

  changeTier(event: Event) {
    this.eaf.setCurrentTier((event.target as HTMLInputElement).value);
  }
}
