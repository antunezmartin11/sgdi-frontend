import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccionesIniciativasComponent } from './menu-acciones-iniciativas.component';

describe('MenuAccionesIniciativasComponent', () => {
  let component: MenuAccionesIniciativasComponent;
  let fixture: ComponentFixture<MenuAccionesIniciativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAccionesIniciativasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAccionesIniciativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
