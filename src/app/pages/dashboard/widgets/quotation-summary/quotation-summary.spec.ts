import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSummary } from './quotation-summary';

describe('QuotationSummary', () => {
  let component: QuotationSummary;
  let fixture: ComponentFixture<QuotationSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
