import { Component } from '@angular/core';
import { ToplevelComponent } from '@fav-components/table-viewer/toplevel.component';

@Component({
  selector: 'app-included-in',
  templateUrl: '../../views/table-viewer/included-in.component.html',
  styleUrls: ['../../styles/table-viewer/included-in.component.scss']
})
export class IncludedInComponent extends ToplevelComponent {}
