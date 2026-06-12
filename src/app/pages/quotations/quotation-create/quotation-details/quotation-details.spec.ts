import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationDetails } from './quotation-details';

describe('QuotationDetails', () => {
  let component: QuotationDetails;
  let fixture: ComponentFixture<QuotationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
