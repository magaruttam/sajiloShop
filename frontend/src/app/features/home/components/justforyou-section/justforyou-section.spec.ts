import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustforyouSection } from './justforyou-section';

describe('JustforyouSection', () => {
  let component: JustforyouSection;
  let fixture: ComponentFixture<JustforyouSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustforyouSection],
    }).compileComponents();

    fixture = TestBed.createComponent(JustforyouSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
