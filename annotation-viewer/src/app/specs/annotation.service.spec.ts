import { TestBed } from '@angular/core/testing';
import { AnnotationService } from '@fav-services/annotation.service';

describe('AnnotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnotationService = TestBed.get(AnnotationService);
    expect(service).toBeTruthy();
  });
});
