import { Component, ViewChild, AfterViewInit } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { AnnotationService } from '@fav-services/annotation.service';
import { AnnotationData } from '@fav-models/annotation/data';

@Component({
  selector: 'app-table-viewer',
  templateUrl: '../views/table-viewer.component.html',
  styleUrls: ['../styles/table-viewer.component.scss']
})
export class TableViewerComponent implements AfterViewInit {

  @ViewChild('videoPlayer') videoPlayer: HTMLVideoElement;

  public annotation: AnnotationData;

  constructor(private annotationService: AnnotationService) { }

  ngAfterViewInit() {

    this.annotationService
      .fetch()
      .subscribe(annotation => {
        this.annotation = annotation;
      });
  }

  formatDuration(time: number) {
    return TimeFormat.fromMs(time, 'hh:mm:ss');
  }

  changeTier(event: Event) {
    this.annotation.setCurrentTier((event.target as HTMLInputElement).value);
  }
}
