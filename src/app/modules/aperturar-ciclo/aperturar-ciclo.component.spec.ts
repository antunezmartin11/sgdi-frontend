import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturarCicloComponent } from './aperturar-ciclo.component';

describe('AperturarCicloComponent', () => {
  let component: AperturarCicloComponent;
  let fixture: ComponentFixture<AperturarCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperturarCicloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturarCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
