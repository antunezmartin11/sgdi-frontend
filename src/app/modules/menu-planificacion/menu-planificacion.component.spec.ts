import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPlanificacionComponent } from './menu-planificacion.component';

describe('MenuPlanificacionComponent', () => {
  let component: MenuPlanificacionComponent;
  let fixture: ComponentFixture<MenuPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPlanificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
