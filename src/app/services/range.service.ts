import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RangeService {

  private rangeSource = new BehaviorSubject([500, 3000]);
  currentRange = this.rangeSource.asObservable();

  constructor() { }

  changeRange(newRange: number[]) {
    console.log('newRange :>> ', newRange);
    return this.rangeSource.next(newRange);
  }
}
