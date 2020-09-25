import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, AfterViewChecked } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import { Observable } from 'rxjs';
import { RangeService } from 'src/app/services/range.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [DecimalPipe],
})
export class SliderComponent implements AfterViewInit, AfterViewChecked {


  // @Output() slideData: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() sliderMRangeSel = [];
  // @ViewChild('mrangeslider') mSliderEl: ElementRef;
  connect = 'true';
  min = '20000';
  someRange = 3000;

  sliderMBounds = [500, 20000];

  constructor(private rangeService: RangeService ) {

  }

  ngAfterViewInit() {
    console.log('this.sliderMRangeSel :>> ', this.sliderMRangeSel);
    this.rangeService.currentRange.subscribe(range => {
      this.sliderMRangeSel = range;
      this.ngAfterViewChecked();
      console.log('this.sliderMRangeSel :>> ', this.sliderMRangeSel);
    });
     // this.mSliderEl.nativeElement(this.sliderMRangeSel);
    // this.func();
  }
  ngAfterViewChecked() {

}

  updateSliderM($event) {
    // this.loanDataService.changeRange($event);

    // this.slideData.emit($event);

     console.log('$event :>> ', $event);
     this.rangeService.changeRange($event);
    // console.log('sliderMRangeSel :>> ', this.sliderMRangeSel);
  }
  // func() {
  //   const connect = this.slider.nativeElement.querySelectorAll('.noUi-connect');
  //   const classes = [
  //     'c-1-color',
  //     'c-2-color',
  //     'c-3-color',
  //     'c-4-color',
  //     'c-5-color',
  //   ];
  //   console.log(connect.length);
  //   for (let i = 0; i < connect.length; i++) {
  //     connect[i].classList.add(classes[i]);
  //   }
  // }
}
