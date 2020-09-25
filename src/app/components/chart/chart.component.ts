import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
declare const TradingView: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {
  symbolPair = 'ICXUSD';
  ngAfterViewInit() {
    new TradingView.widget({
      container_id: 'technical-analysis',
      autosize: true,
      symbol: this.symbolPair,
      interval: '120',
      timezone: 'exchange',
      theme: 'light',
      style: '1',
      toolbar_bg: '#f1f3f6',
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      hideideas: true,
      studies: [],
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
    });
  }
}
