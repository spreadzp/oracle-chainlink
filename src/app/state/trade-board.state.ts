import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PriceInfo } from '../interfaces/priceInfo.interface';
import { GetNewPrice } from './price.action';
import { GetContextTradeBoard } from './trade-board.action';

interface TradeBoardModel {
  /** favorite list */
  priceInfo: PriceInfo;
}

@State<TradeBoardModel>({
  name: 'TradeBoardState',
  defaults: { priceInfo: {} as PriceInfo }
})
@Injectable()
export class TradeBoardStore {
  /**
   * we can inject dependencies as in services or components,
   * but we can't use they for static methods
   */
  constructor() {}

  /**
   * we can give a part of state through clean function,
   * in current case we give away article title or status message
   */
  @Selector()
  static getLastPrice(state: TradeBoardModel): number {
    if ( !state.priceInfo) {
      return 0;
    }

    return state.priceInfo.price;
  }

  /**
   * Typical case to use API request through NGXS Action.
   * It is very important return Observable to method.
   * NGXS subscribe to Observable himself and doing Action async.
   * This very help developer receiving statuses API requests, without adding extra entities in State
   */
  @Action(GetContextTradeBoard)
  loadPrice({ patchState, dispatch }: StateContext<TradeBoardModel>, { newPrice }: GetNewPrice) {

     
  }
}
