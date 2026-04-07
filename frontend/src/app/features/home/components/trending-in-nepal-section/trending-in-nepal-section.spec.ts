import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingInNepalSection } from './trending-in-nepal-section';

describe('TrendingInNepalSection', () => {
  let component: TrendingInNepalSection;
  let fixture: ComponentFixture<TrendingInNepalSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingInNepalSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingInNepalSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
