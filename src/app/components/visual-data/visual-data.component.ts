import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-visual-data',
  templateUrl: './visual-data.component.html',
  styleUrls: ['./visual-data.component.sass']
})
export class VisualDataComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() selectedDay: any;
  @Input('weatherData') weatherData: any;
  @Input('hourlyData') hourlyData: Array<any>
  private transformedData: any;
  private dataSource: object = {};
  public dayTempData: Array<any>;


  multi: any[];
  view: any[];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  yAxisLabel: string = '';
  timeline: boolean = true;
  schemeType: string = 'ordinal'


  colorScheme = {
    domain: ['#aae3f5']
  };

  colorScheme1 = {
    domain: ['#faf7e1']
  };

  constructor () { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hourlyData) {
      const transformed = this.hourlyData.map((hr) => {
        let obj = {};
        obj['value'] = this.getCelcius(hr.feels_like),
          obj['name'] = this.getTimeAMPMFormat(new Date(hr.dt * 1000));
        return obj;
      });
      this.transformedData = [{ "name": "", "series": transformed }];
     
    }

    let dayTempObj = []

    for (const key in this.selectedDay.feels_like) {
      if (Object.prototype.hasOwnProperty.call(this.selectedDay.feels_like, key)) {
        let obj = {};
        obj['name'] = key;
        obj['value'] = this.getCelcius(this.selectedDay.feels_like[key]);
        dayTempObj.push(obj);
      }
    }
    this.dayTempData = [{ 'name': 'dayTemp', 'series': dayTempObj }]


  }
  getCelcius(val: number): unknown {
    return (val - 273.15).toFixed(2);
  }
  ngAfterViewInit(): void {
    console.log(this.hourlyData);

  }


  onSelect(event): void {
    console.log(event);
  }

  getTimeAMPMFormat(date): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    // appending zero in the start if hours less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }
  getTime(timestamp): string {
    return this.getTimeAMPMFormat(new Date(timestamp * 1000));
  }



}
