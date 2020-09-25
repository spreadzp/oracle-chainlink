import { TestBed } from '@angular/core/testing';

import { ShowPage.Service.TsService } from './show-page.service';

describe('ShowPage.Service.TsService', () => {
  let service: ShowPage.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowPage.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
