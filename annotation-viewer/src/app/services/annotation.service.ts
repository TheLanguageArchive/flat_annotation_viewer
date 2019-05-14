import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AnnotationData } from '@fav-models/annotation/data';
import { MessageService } from '@fav-services/message.service';
import { SerializeAnnotationData } from '@fav-models/serializers/annotation-data';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  private annotationUrl = '/flat/islandora/object/lat:12345_fef5f9f8_6e19_49ac_a605_3b4387bf76d0/av';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  fetch(): Observable<AnnotationData> {

    return this.http
      .get(this.annotationUrl)
      .pipe(
        map(res => SerializeAnnotationData(res as AnnotationData)),
        tap(_ => this.messageService.add('fetched accommodations')),
        catchError(this.handleError<AnnotationData>('fetch', null))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send error to monolog

      this.messageService.add(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
