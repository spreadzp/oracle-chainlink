import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDerivativeComponent } from './manage-derivative.component';

describe('ManageDerivativeComponent', () => {
  let component: ManageDerivativeComponent;
  let fixture: ComponentFixture<ManageDerivativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDerivativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDerivativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
