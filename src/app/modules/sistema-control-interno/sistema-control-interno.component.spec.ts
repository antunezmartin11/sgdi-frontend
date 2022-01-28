import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaControlInternoComponent } from './sistema-control-interno.component';

describe('SistemaControlInternoComponent', () => {
  let component: SistemaControlInternoComponent;
  let fixture: ComponentFixture<SistemaControlInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SistemaControlInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaControlInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
