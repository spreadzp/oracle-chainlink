import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShowPageService {
  namePage = 'home';
  private pageShowSource$ = new BehaviorSubject(this.namePage);
  activePage = this.pageShowSource$.asObservable();

  getStatusPage() {
    return this.activePage;
  }
  changeStatusPage(newPageName: string) {
    this.namePage = newPageName;
    return this.pageShowSource$.next(this.namePage);
  }
}
