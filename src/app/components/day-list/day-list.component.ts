import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';




@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.sass']
})
export class DayListComponent implements OnInit, OnChanges {
  @Input('wetherData') weatherData: any
  public selectedDay: any;
  public hourlyData: Array<any>;
  constructor () { }

  ngOnInit(): void {
    // console.log(this.weatherData);

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("change occured", changes.weatherData);
    if (changes.weatherData) {
      this.selectedDay = undefined;
    }
    // Assign first value when data is available
    if (this.selectedDay === undefined && this.weatherData?.daily.length) {
      this.selectedDay = this.weatherData?.daily[0];
      this.pickDataForSameDay(0);
    }
  }

  getDay(timestamp: number): string {
    return new Date(timestamp * 1000).toString().substring(0, 3);
  }

  getCelcius(val: number): unknown {
    return (val - 273.15).toFixed(2);
  }

  getSelectedDay(day, index?): void {
    this.selectedDay = day;
    this.pickDataForSameDay(index);
  }
  /**
   * Function split data in 24 hourly data as 2D Array & assign selected index of day selected  
  */
  pickDataForSameDay(index?: number): void {
    const hourlyArry = this.weatherData.hourly.filter((hourlyobj) => this.getDay(hourlyobj.dt) == this.getDay(this.selectedDay.dt));
    this.hourlyData = hourlyArry.length ? hourlyArry : [];
  }


}
