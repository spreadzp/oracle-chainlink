import { PriceInfo } from '../interfaces/priceInfo.interface';

export class GetContextTradeBoard {
  static readonly type = '[Trade Board] New data';
  constructor(public newPrice: PriceInfo) {}
}
