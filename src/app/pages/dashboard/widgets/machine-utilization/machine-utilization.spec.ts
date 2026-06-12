import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineUtilization } from './machine-utilization';

describe('MachineUtilization', () => {
  let component: MachineUtilization;
  let fixture: ComponentFixture<MachineUtilization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineUtilization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineUtilization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
