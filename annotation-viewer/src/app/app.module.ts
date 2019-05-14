import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@fav/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '@fav-components/app.component';
import { TableViewerComponent } from '@fav-components/table-viewer.component';
import { MessagesComponent } from '@fav-components/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    TableViewerComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
