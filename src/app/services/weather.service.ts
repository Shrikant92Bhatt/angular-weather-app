import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APPID: string;
  private API_URL: string;
  constructor (private _http: HttpClient) {
    this.APPID = "64f7f137354b356491bdb3f4c94af609";
    this.API_URL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=";
  }


  searchWeatherData(cityName: string): Observable<any> {
    return this._http
      .get(this.API_URL + cityName + "&appid=" + this.APPID + "&cnt=7").pipe(
        tap(
          (response) => {
            console.log(response);
            return response;
          },
          (error) => {
            console.log(error);
            return Observable.throw(error.json());
          }
        ));
  }

  getWeatherDataByLatLong(lat: number, lon: number): Observable<any> {
    return this._http
      .get('https://api.openweathermap.org/data/2.5/onecall?' + `lat=${lat}&lon=${lon}` + "&appid=" + this.APPID).pipe(
        map(
          (response) => {
            const res = JSON.parse(JSON.stringify(response));
            res.daily.splice(-3, 3);
            return res;
          }
        ));
  }
}
