import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesAuditoriaComponent } from './informes-auditoria.component';

describe('InformesAuditoriaComponent', () => {
  let component: InformesAuditoriaComponent;
  let fixture: ComponentFixture<InformesAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesAuditoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
