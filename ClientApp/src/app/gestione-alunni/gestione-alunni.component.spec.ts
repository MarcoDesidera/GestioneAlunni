import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneAlunniComponent } from './gestione-alunni.component';

describe('GestioneAlunniComponent', () => {
  let component: GestioneAlunniComponent;
  let fixture: ComponentFixture<GestioneAlunniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneAlunniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneAlunniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
