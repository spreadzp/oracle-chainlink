import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnChartComponent } from './earn-chart.component';

describe('EarnChartComponent', () => {
  let component: EarnChartComponent;
  let fixture: ComponentFixture<EarnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
