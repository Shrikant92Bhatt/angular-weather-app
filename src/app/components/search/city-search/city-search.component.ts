import { Component, OnInit, AfterViewInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GeoLicationService } from 'src/app/services/geo-lication.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.sass']
})
export class CitySearchComponent implements OnInit, AfterViewInit, OnChanges {
  public myControl = new FormControl();
  public options: Array<any> = [];
  filteredOptions: Observable<any[]>;
  public weatherDataJson: any;
  private wetherDataArray: Array<any> = []
  constructor (public locationService: GeoLicationService) { }

  ngOnInit(): void {
    // this.locationService.getCurrentLocation();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );



  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.myControl);

  }
  private _filter(value: any): any[] {
    const filterValue = value['city-name'] ? value['city-name'].toLowerCase() : '';

    return this.options.filter(option => option['city-name'].toLowerCase().includes(filterValue));
  }
  ngAfterViewInit(): void {
    this.locationService.getCurrentLatLon();
  }

  hasData(): undefined | number {
    return Object.keys(this.locationService.weatherDataJson).length;
  }

  getCelcius(val: number): unknown {
    return (val - 273.15).toFixed(2);
  }

  citySearch(event) {
    this.locationService.searchCityByName(event.target.value).pipe(map((option: any) => {
      const cityName = option[0];
      option.splice(0, 1);
      option.forEach((element, i) => {
        element['city-name'] = cityName[i];
      });
      return option;
    })).subscribe((option) => {
      this.options = option;
    });
  }

  selectedCity(selectedCity) {
    this.locationService.weatherDataJson = selectedCity;
  }
}
