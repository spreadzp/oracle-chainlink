import { AfterViewChecked, AfterViewInit, Component, DoCheck, Input, NgZone, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { RangeService } from 'src/app/services/range.service';

@Component({
  selector: 'app-earn-chart',
  templateUrl: './earn-chart.component.html',
  styleUrls: ['./earn-chart.component.scss']
})
export class EarnChartComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck {

  @Input() stakeData: [];
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartData = [];
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = true;
  runOutsideAngularFlag = true;
  chartOptions: Options = {};
  chart = null;
  chartCallback: Highcharts.ChartCallbackFunction = null;
  self = null;


  constructor(private rangeService: RangeService, private zone: NgZone) {
    this.self = this;

    this.chartCallback = chart => {
      // saving chart reference
      this.self.chart = chart;
    };
  }
  ngOnInit() {
    // this.rangeService.currentRange.subscribe(range => {
    //   this.chartData = range;

    //   this.ngAfterViewChecked();
    // });
  }
  ngAfterViewInit() {
    // this.chartOptions.series = [({ data: this.chartData, type: 'line' })];
  }
  ngDoCheck() {
    this.chartOptions.series = [({ data: this.stakeData, type: 'line' })];
  }
  ngAfterViewChecked() {
    console.log('this.chartData :>> ', this.chartData);

    // this.ngAfterViewInit();
    if (this.self.chart) {
      // this.ngOnInit();
    }
  }
}
