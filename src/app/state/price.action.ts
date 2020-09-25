import { PriceInfo } from '../interfaces/priceInfo.interface';

export class GetNewPrice {
  static readonly type = '[Price] New price';
  constructor(public newPrice: PriceInfo) {}
}
