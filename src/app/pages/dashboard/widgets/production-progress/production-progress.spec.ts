import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProgress } from './production-progress';

describe('ProductionProgress', () => {
  let component: ProductionProgress;
  let fixture: ComponentFixture<ProductionProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
