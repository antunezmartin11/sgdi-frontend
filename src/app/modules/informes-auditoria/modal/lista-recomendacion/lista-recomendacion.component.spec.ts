import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecomendacionComponent } from './lista-recomendacion.component';

describe('ListaRecomendacionComponent', () => {
  let component: ListaRecomendacionComponent;
  let fixture: ComponentFixture<ListaRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRecomendacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
