import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotPrimary } from './quotation-create';

describe('QuotPrimary', () => {
  let component: QuotPrimary;
  let fixture: ComponentFixture<QuotPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
