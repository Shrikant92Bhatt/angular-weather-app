import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';
import { CitySearchComponent } from './components/search/city-search/city-search.component';
import { DayListComponent } from './components/day-list/day-list.component';
import { VisualDataComponent } from './components/visual-data/visual-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    DayListComponent,
    VisualDataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgxChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
