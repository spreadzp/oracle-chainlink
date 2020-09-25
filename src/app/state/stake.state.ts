import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PriceInfo } from '../interfaces/priceInfo.interface';
import { GetNewPrice } from './price.action';
import { PriceService } from '../services/price.service';
import { StakeData } from '../interfaces/stake.interface';
import { GetStakePrice } from './stake.action';
import { StakeService } from '../services/stake.services';

interface StakeModel {
  /** favorite list */
  stakeData: StakeData;
}

@State<StakeModel>({
  name: 'StakeState',
  defaults: { stakeData: {} as StakeData }
})
@Injectable()
export class StakeStore {
  /**
   * we can inject dependencies as in services or components,
   * but we can't use they for static methods
   */
  constructor(private readonly httpClient: HttpClient, private readonly stakeService: StakeService) {}

  /**
   * we can give a part of state through clean function,
   * in current case we give away article title or status message
   */
  @Selector()
  static getStartValue(state: StakeModel): number {
    // if ( !state.stakeData) {
    //   return 0;
    // }

    return state.stakeData.startValue;
  }
  @Selector()
  static getFinishValue(state: StakeModel): number {
    // if ( !state.stakeData) {
    //   return 0;
    // }

    return state.stakeData.finishValue;
  }

  /**
   * Typical case to use API request through NGXS Action.
   * It is very important return Observable to method.
   * NGXS subscribe to Observable himself and doing Action async.
   * This very help developer receiving statuses API requests, without adding extra entities in State
   */
  @Action(GetStakePrice)
  loadPrice({ patchState, dispatch }: StateContext<StakeModel>, { stakeData }: GetStakePrice) {

    return this.stakeService.getStake()
     .pipe(
      tap((stakeData: StakeData) => {
        console.log('@@@@@@@@@@@priceInfo :>> ', stakeData);
        patchState({ stakeData });
      })
    );
  }
}
