import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { WeatherService } from './weather.service'
import { Observable, forkJoin, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeoLicationService {
  public currentloction: unknown;
  public weatherDataJson: Partial<Object> = {};
  constructor (private http: HttpClient, private weatherService: WeatherService) { }

  getCurrentLocation(): void {
    this.http.get('http://ip-api.com/json').pipe(switchMap(
      (data: any) => {
        return this.weatherService.searchWeatherData(data.city);
      }
    )).subscribe((resp) => {
      this.weatherDataJson = resp;
      console.log(this.weatherDataJson);
    });
  }

  getCurrentLatLon(): void {
    this.http.get('http://ip-api.com/json').pipe(switchMap(
      (data: any) => {
        // console.log(data);
        return this.weatherService.getWeatherDataByLatLong(data.lat, data.lon);
      }
    )).subscribe((resp) => {
      this.weatherDataJson = resp;
      // console.log(this.weatherDataJson);
    });
  }

  searchCityByName(cityName: string) {
    return this.http.get(`https://api.teleport.org/api/cities/?search=${cityName}&limit=3&embed=city%3Asearch-results%2Fcity%3Aitem%2F%7Bcity%3Acountry%2Ccity%3Aadmin1_division%2Ccity%3Atimezone%2Ftz%3Aoffsets-now%2Ccity%3Aurban_area%7D`).pipe(switchMap((data: any) => {
      let fokjoineArr = [];
      let cityListArry = [];
      data._embedded['city:search-results'].forEach(city => {
        const latlon = city._embedded['city:item'].location.latlon;
        cityListArry.push(city._embedded['city:item'].full_name)
        fokjoineArr.push(this.weatherService.getWeatherDataByLatLong(latlon.latitude, latlon.longitude));
      });
      return forkJoin([of(cityListArry), ...fokjoineArr]);
    }));
  }
}
