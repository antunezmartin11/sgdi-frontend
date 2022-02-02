import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionServidorComponent } from './planificacion-servidor.component';

describe('PlanificacionServidorComponent', () => {
  let component: PlanificacionServidorComponent;
  let fixture: ComponentFixture<PlanificacionServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificacionServidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
