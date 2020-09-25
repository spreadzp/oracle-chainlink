import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceInfo } from '../interfaces/priceInfo.interface';
import { StakeData } from '../interfaces/stake.interface';
import { of, from } from 'rxjs';
import { ShowPageService } from './show-page.service';
// import { IconService, HttpProvider, IconWallet } from 'icon-sdk-js';
// import * as ccxt from 'ccxt';
@Injectable({
  providedIn: 'root'
})
export class StakeService {
  provider = null;
  exchangeId = 'binance';
  stake = {} as StakeData;
//    exchangeClass = ccxt[this.exchangeId];
//    exchange = new this.exchangeClass ({
//     apiKey: 'YOUR_API_KEY',
//     secret: 'YOUR_SECRET',
//     timeout: 30000,
//     enableRateLimit: true,
// });
  constructor(private httpClient: HttpClient, private showPageService: ShowPageService) {

  }

  getStake() {
    this.stake.blockNumber = 1234;
    this.stake.price = 55;
    this.stake.symbol = "AWE";
    this.stake.startValue = 100;
    this.stake.finishValue = 12345;

    return of(this.stake);

  }

 
}
