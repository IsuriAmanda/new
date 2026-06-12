import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationView } from './quotation-view';

describe('QuotationView', () => {
  let component: QuotationView;
  let fixture: ComponentFixture<QuotationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
