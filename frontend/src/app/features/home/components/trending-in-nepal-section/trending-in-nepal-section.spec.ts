import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendinginNepalSection } from './trending-in-nepal-section';

describe('TrendinginNepalSection', () => {
  let component: TrendinginNepalSection;
  let fixture: ComponentFixture<TrendinginNepalSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendinginNepalSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendinginNepalSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
