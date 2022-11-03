import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCarComponent } from './market-car.component';

describe('MarketCarComponent', () => {
  let component: MarketCarComponent;
  let fixture: ComponentFixture<MarketCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
