import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitaDetailsDialogComponent } from './cita-details-dialog.component';

describe('CitaDetailsDialogComponent', () => {
  let component: CitaDetailsDialogComponent;
  let fixture: ComponentFixture<CitaDetailsDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockData = {
    nombreCliente: 'Juan Pérez',
    nombreMascota: 'Firulais',
    fechaHora: new Date(),
    razonCita: 'Vacunación anual'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaDetailsDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
