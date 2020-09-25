import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RangeService } from 'src/app/services/range.service';
import { ShowPageService } from 'src/app/services/show-page.service';
import { StakeService } from 'src/app/services/stake.services';
import { StakeStore } from 'src/app/state/stake.state';
import { EarnChartComponent } from '../earn-chart/earn-chart.component';


@Component({
  selector: 'app-staking',
  templateUrl: './staking.component.html',
  styleUrls: ['./staking.component.scss']
})
export class StakingComponent implements OnInit, DoCheck {
  @Select(StakeStore.getStartValue)
  public startValue$: Observable<number>;

  @Select(StakeStore.getFinishValue)
  public finishValue$: Observable<number>;

  @ViewChild('myChild') private myChild: EarnChartComponent;
  time = '';
  currentLoan = 3000;
  finishLoan = 3000;
  newRange = [500, 3000];
  showChart = true;
  calcRoiYear = 0;
  currensies = ['ALL', 'BTC', 'DASH', 'NDX', 'NCP', 'ETH', 'USDT'];
  choisedCurrency = null;
  assetCharts = {};
  priceName = 'ALL';
  isExpanded = false;
  profitDay = '0.00';
  profitTotal = '0.00';
  profitMonth = '0.00';
  forecastOneWeek = '0.00';
  forecastOneMonth = '0.00';
  forecastSixMonth = '0.00';
  forecastOneYear = '0.00';
  staked = false;
  isStakeAvailable = false;
  calcMonthCount = 12;
  calcRoiMonth = 4;
  stakeData = [500, 6000];
  constructor(private stakeService: StakeService, private rangeService: RangeService, private showPageService: ShowPageService) { }

  ngOnInit(): void {
    this.stakeService.getStake().subscribe((data) =>
    console.log('data :>> ', data) );
    const currentTime = new Date();
    const minutes = currentTime.getMinutes() + 20;
    const hours =
      minutes > 60 ? currentTime.getHours() + 1 : currentTime.getHours();
    this.time = hours + ' : ' + (minutes % 60);
    // this.currentLoan = this.newRange[1];
    // this.finishLoan = Math.floor(this.currentLoan * 1.001);
    console.log('startValue$ :>> ', this.startValue$);
    this.rangeService.currentRange.subscribe((range) => {
      // this.showChart = false;
      this.newRange = range;
      this.stakeData = range;
      this.myChild = null;
      // this.myChild.ngOnInit();
      this.currentLoan = this.newRange[0];
      // this.userService.setNewUserData('loanSum', this.currentLoan);
      this.finishLoan = this.newRange[1];
      console.log('this.currentLoan :>> ', this.currentLoan);
      console.log('this.finishLoan :>> ', this.finishLoan);
      console.log('this.newRange :>> ', this.newRange);
    });
  }

  ngDoCheck() {
    this.rangeService.currentRange.subscribe((range) => {
      this.newRange = range;
      this.stakeData = range;
      // this.showChart = false;
      this.myChild = null;
      // this.myChild.ngOnInit();
      this.currentLoan = this.newRange[0];
      // this.userService.setNewUserData('loanSum', this.currentLoan);
      this.finishLoan = this.newRange[1];
      this.showChart = true;
      // console.log('this.currentLoan :>> ', this.currentLoan);
      // console.log('this.finishLoan :>> ', this.finishLoan);
      // console.log('this.newRange :>> ', this.newRange);
    });
  }

  makeStaking() {
    this.showPageService.changeStatusPage('md');
  }

  refreshChart() {
    this.showChart = false;
    console.log('bliur @@@object :>> ');
    this.showChart = true;
  }
}
