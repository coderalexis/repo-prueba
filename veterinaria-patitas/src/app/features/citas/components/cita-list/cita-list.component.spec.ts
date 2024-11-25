import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaListComponent } from './cita-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Cita } from '@models/cita.model';
import { CitasActions } from '@features/citas/store/citas.actions';
import { of, BehaviorSubject } from 'rxjs';
import { selectAllCitas } from '@features/citas/store/citas.selectors';
import { CitaDetailsDialogComponent } from '@features/citas/components/cita-details-dialog/cita-details-dialog.component';
import createSpyObj = jasmine.createSpyObj;
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CitaListComponent', () => {
  let component: CitaListComponent;
  let fixture: ComponentFixture<CitaListComponent>;
  let store: MockStore;
  let dialog: MatDialog;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CitaListComponent,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog);

    fixture = TestBed.createComponent(CitaListComponent);
    component = fixture.componentInstance;

    spyOn(dialog, 'open').and.callThrough();

  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería despachar la acción loadCitas en ngOnInit', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(CitasActions.loadCitas());
  });

  it('debería actualizar selectedDateSubject al seleccionar una fecha', () => {
    const fechaPrueba = new Date('2023-10-10');
    component.onDateSelected({ value: fechaPrueba });
    component.selectedDate$.subscribe(fecha => {
      expect(fecha).toEqual(fechaPrueba);
    });
  });

  it('debería abrir el diálogo con los datos correctos', () => {
    const cita: Cita = {
      id: 1,
      nombreCliente: 'Juan Pérez',
      nombreMascota: 'Firulais',
      razonCita: 'Vacunación',
      fechaHora: '2023-10-10T10:00:00Z',
      atendida: false
    };

    component.openDetailsDialog(cita);

    expect(dialog.open).toHaveBeenCalledWith(
      CitaDetailsDialogComponent,
      {
        data: cita,
        width: '400px'
      }
    );
  });

  it('debería despachar deleteCita cuando se proporciona un ID válido', () => {
    spyOn(store, 'dispatch');
    component.deleteCita(1);
    expect(store.dispatch).toHaveBeenCalledWith(CitasActions.deleteCita({ id: 1 }));
  });

  it('no debería despachar deleteCita cuando el ID es undefined', () => {
    spyOn(store, 'dispatch');
    component.deleteCita(undefined);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('debería filtrar y ordenar las citas correctamente', (done) => {
    const citas: Cita[] = [
      {
        id: 1,
        nombreCliente: 'Juan Pérez',
        nombreMascota: 'Firulais',
        razonCita: 'Vacunación',
        fechaHora: '2023-10-10T10:00:00Z',
        atendida: false
      },
      {
        id: 2,
        nombreCliente: 'María Gómez',
        nombreMascota: 'Pelusa',
        razonCita: 'Chequeo',
        fechaHora: '2023-10-10T09:00:00Z',
        atendida: false
      },
      {
        id: 3,
        nombreCliente: 'Carlos López',
        nombreMascota: 'Max',
        razonCita: 'Consulta',
        fechaHora: '2023-10-11T11:00:00Z',
        atendida: false
      }
    ];

    store.overrideSelector(selectAllCitas, citas);

    component.selectedDateSubject = new BehaviorSubject<Date>(new Date('2023-10-10'));

    fixture.detectChanges();

    component.filteredCitas$.subscribe(filteredCitas => {
      expect(filteredCitas.length).toBe(2);
      expect(filteredCitas[0].id).toBe(2);
      expect(filteredCitas[1].id).toBe(1);
      done();
    });
  });

});
