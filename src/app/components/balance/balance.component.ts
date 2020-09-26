import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// import { IconProviderService } from 'src/app/services/icon-provider.service';
import { PriceInfo } from 'src/app/interfaces/priceInfo.interface';
import { BoardService } from 'src/app/services/board.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {


  private unsubscriber$ = new Subject<void>();
  public inProgress = true;

  /** error text when http request return not 200 status */
  public errorString: string;
  price = 0;
  result = null;
  lastBlock = null;
  priceInfo = {} as PriceInfo;
  hashDerivative = '';
  constructor(private web3Service: Web3Service, private boardService: BoardService   ) { }

  ngOnInit(): void {
    this.web3Service.blockObservable.subscribe(block => this.lastBlock = block);
    this.boardService.hashDerivative.subscribe(hash => this.hashDerivative = hash);

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

  }

  addPrice() {
    // this.iconProviderService.setNewPriceAndBlock();


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
