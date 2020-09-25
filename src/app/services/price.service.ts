import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceInfo } from '../interfaces/priceInfo.interface';
// import { IconService, HttpProvider, IconWallet } from 'icon-sdk-js';
// import * as ccxt from 'ccxt';
@Injectable({
  providedIn: 'root'
})
export class PriceService {
  provider = null;
  exchangeId = 'binance';
//    exchangeClass = ccxt[this.exchangeId];
//    exchange = new this.exchangeClass ({
//     apiKey: 'YOUR_API_KEY',
//     secret: 'YOUR_SECRET',
//     timeout: 30000,
//     enableRateLimit: true,
// });
  constructor(private httpClient: HttpClient) {

  }

 getPrice() {
  return this.httpClient.get<PriceInfo>('https://api.binance.com/api/v3/ticker/price?symbol=ICXUSDT');

 }
}
