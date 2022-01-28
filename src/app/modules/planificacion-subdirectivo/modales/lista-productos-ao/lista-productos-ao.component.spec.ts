import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosAOComponent } from './lista-productos-ao.component';

describe('ListaProductosAOComponent', () => {
  let component: ListaProductosAOComponent;
  let fixture: ComponentFixture<ListaProductosAOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProductosAOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProductosAOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
