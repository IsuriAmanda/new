import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsList } from './quotations-list';

describe('QuotationsList', () => {
  let component: QuotationsList;
  let fixture: ComponentFixture<QuotationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
