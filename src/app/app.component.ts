import { Component, OnInit } from '@angular/core';
import { GeoLicationService } from './services/geo-lication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor (private locationService: GeoLicationService) { }
  ngOnInit(): void {
   
    
  }
}
