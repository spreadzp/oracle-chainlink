import { StakeData } from '../interfaces/stake.interface';

export class GetStakePrice {
  static readonly type = '[Stake] New stake value';
  constructor(public stakeData: StakeData) {}
}
