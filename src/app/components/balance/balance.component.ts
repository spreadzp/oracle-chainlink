import { Component, OnInit } from '@angular/core';
// import { IconProviderService } from 'src/app/services/icon-provider.service';
import { PriceInfo } from 'src/app/interfaces/priceInfo.interface';
import { PriceStore } from 'src/app/state/price.state';
import { Select, Store, Actions, ofActionDispatched, ofActionCompleted } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetNewPrice } from 'src/app/state/price.action';
import { TradeBoardStore } from 'src/app/state/trade-board.state';
import { GetContextTradeBoard } from 'src/app/state/trade-board.action';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Select(PriceStore.getLastPrice)
  public currentPrice$: Observable<number>;

  @Select(TradeBoardStore.getLastPrice)
  public priceFromContract$: Observable<number>;

  private unsubscriber$ = new Subject<void>();
  public inProgress = true;

  /** error text when http request return not 200 status */
  public errorString: string;
  price = 0;
  result = null;
  lastBlock = null;
  priceInfo = {} as PriceInfo;
  constructor(  private store: Store, private actions$: Actions) { }

  ngOnInit(): void {
    // this.iconProviderService.getWallet()
    //   .then(res => this.result = res);
    // this.iconProviderService.getLastBlock()
    //   .then(block => this.lastBlock = block.height);
    // this.iconProviderService.getLastPrice()
    //   .then(newPrice => {
    //     console.log('newPrice :>> ', newPrice);
    //     this.priceInfo.price = this.convertHashToInt(newPrice.price) / 10e5;
    //     this.priceInfo.blockNumber = this.convertHashToInt(newPrice.blockNumber);
    //   });
    // this.subscribeToActionDispatched();
    this.store.dispatch(new GetNewPrice(null));
    this.store.dispatch(new GetContextTradeBoard(null));
  }

  addPrice() {
    // this.iconProviderService.setNewPriceAndBlock();
    console.log('currentPrice$ :>> ', this.currentPrice$);
    console.log('store :>> ', this.store);
  }

  convertHashToInt(hashValue: string) {
    return parseInt(hashValue, 16);
  }

  // /** mark the start of download content */
  // private subscribeToActionDispatched(): void {
  //   this.actions$
  //     .pipe(
  //       ofActionCompleted(GetNewPrice),
  //       takeUntil(this.unsubscriber$)
  //     )
  //     .subscribe((n) => {
  //       console.log('#############n :>> ', n);
  //       this.inProgress = false;
  //       this.errorString = null;
  //     });
  // }

}
