import { Injectable } from '@angular/core';
import { Eaf } from '@fav-models/eaf';
import { EafService } from '@fav-services/eaf.service';

@Injectable({
  providedIn: 'root'
})
export class EafStoreService {

  private eaf: Eaf;
  private activeIds: string[];

  constructor(private eafService: EafService) {}

  fetchData() {

    return this.eafService
      .fetch()
      .subscribe(eaf => {

        this.eaf       = eaf;
        this.activeIds = [eaf.getCurrentTier().annotations[0].id];
      });
  }

  setActiveIds(activeIds: string[]) {
    this.activeIds = activeIds;
  }

  getActiveIds() {
    return this.activeIds;
  }

  setCurrentTier(id: string) {
    this.eaf.setCurrentTier(id);
  }

  getCurrentTier() {
    return this.eaf.getCurrentTier();
  }

  getCurrentAnnotations() {
    return this.getCurrentTier().annotations;
  }
}
