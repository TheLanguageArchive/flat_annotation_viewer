import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('videoPlayer') videoPlayer: VideoComponent;

  constructor(private eafService: EafService) { }

  /**
   * Fetching the annotations from the EAF Service
   */
  ngOnInit() {

    this.eafService
      .fetch()
      .subscribe(eaf => {

        this.eaf       = eaf;
        this.activeIds = [eaf.getCurrentTier().annotations[0].id];
      });
  }

  /**
   * Video Component sends this method the current time
   * so we can activate the appropriate annotations.
   *
   * @param currentTime
   */
  progressTracker(currentTime: number) {

    let activeIds = [];
    for (let annotation of this.eaf.getCurrentTier().annotations) {

      if (annotation.type === 'ref' && annotation.custom_start != null) {

        // ref annotation with custom start/end times
        if (currentTime >= annotation.custom_start.time && currentTime <= annotation.custom_end.time) {
          activeIds.push(annotation.id);
        }
      }

      if (annotation.type === 'ref' && annotation.custom_start == null) {

        // ref annotation without custom start/end times
        // get start/end from referenced annotation
        if (currentTime >= annotation.referenced_annotation.start.time && currentTime <= annotation.referenced_annotation.end.time) {
          activeIds.push(annotation.id);
        }
      }

      if (annotation.type === 'alignable' && annotation.custom_start == null) {

        // alignable annotation without custom time
        if (currentTime >= annotation.start.time && currentTime <= annotation.end.time) {
          activeIds.push(annotation.id);
        }
      }

      if (annotation.type === 'alignable' && annotation.custom_start != null) {

        // alignable annotation with custom time
        if (currentTime >= annotation.custom_start.time && currentTime <= annotation.custom_end.time) {
          activeIds.push(annotation.id);
        }
      }
    }

    this.activeIds = activeIds;
  }

  /**
   * This method allows you to activate an annotation.
   * It also sets the video player at the correct time.
   *
   * @param annotationId
   */
  activateAnnotation(annotationId: string) {

    this.activeIds = [annotationId];

    for (let annotation of this.eaf.getCurrentTier().annotations) {

      if (annotation.id === annotationId) {

        let time = 0;

        if (annotation.type === 'ref' && annotation.custom_start != null) {
          time = annotation.custom_start.time;
        }

        if (annotation.type === 'ref' && annotation.custom_start == null) {
          time = annotation.referenced_annotation.start.time;
        }

        if (annotation.type === 'alignable') {
          time = annotation.start.time;
        }

        this.videoPlayer.setPlayTime(time);
      }
    }
  }

  /**
   * Formatting duration of an annotation
   *
   * @param duration
   */
  formatDuration(duration: number) {
    return TimeFormat.fromMs(duration, 'hh:mm:ss.sss');
  }

  /**
   * Changing tier and loading its annotation in the table
   * and activating the appropriate annotations at the current
   * video player time.
   *
   * @param event
   */
  changeTier(event: Event) {

    this.eaf.setCurrentTier((event.target as HTMLInputElement).value);
    this.progressTracker(this.videoPlayer.getPlayTime());
  }
}
