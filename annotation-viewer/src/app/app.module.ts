import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@fav/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '@fav-components/app.component';
import { TableViewerComponent } from '@fav-components/table-viewer.component';
import { MessagesComponent } from '@fav-components/messages.component';
import { VideoComponent } from '@fav-components/video.component';
import { ToplevelComponent } from '@fav-components/table-viewer/toplevel.component';
import { SymbolicSubdivisionComponent } from '@fav-components/table-viewer/symbolic-subdivision.component';
import { TimeSubdivisionComponent } from '@fav-components/table-viewer/time-subdivision.component';
import { SymbolicAssociationComponent } from '@fav-components/table-viewer/symbolic-association.component';
import { IncludedInComponent } from '@fav-components/table-viewer/included-in.component';
import { EafStore } from '@fav-stores/eaf-store';

@NgModule({
  declarations: [
    AppComponent,
    TableViewerComponent,
    MessagesComponent,
    VideoComponent,
    ToplevelComponent,
    SymbolicSubdivisionComponent,
    SymbolicAssociationComponent,
    TimeSubdivisionComponent,
    IncludedInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [EafStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
