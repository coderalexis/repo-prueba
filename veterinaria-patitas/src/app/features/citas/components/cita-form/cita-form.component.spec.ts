import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CitaFormComponent } from './cita-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CitasSelectors } from '@features/citas/store/citas.selectors';
import { CitasActions } from '@features/citas/store/citas.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { TimeSlot } from '@models/cita.model';

describe('CitaFormComponent', () => {
  let component: CitaFormComponent;
  let fixture: ComponentFixture<CitaFormComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CitaFormComponent,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: CitasSelectors.selectAvailableSlots,
              value: ['2023-10-10T09:00:00Z']
            },
          ],
        }),
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(CitaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    expect(component.citaForm).toBeDefined();
    expect(component.citaForm.get('nombreCliente')?.value).toBe('');
    expect(component.citaForm.get('nombreMascota')?.value).toBe('');
    expect(component.citaForm.get('razonCita')?.value).toBe('');
    expect(component.citaForm.get('fecha')?.value).toBe('');
    expect(component.citaForm.get('hora')?.value).toBe('');
    expect(component.citaForm.valid).toBeFalse();
  });

  it('debería validar campos requeridos', () => {
    const form = component.citaForm;

    expect(form.get('nombreCliente')?.errors?.['required']).toBeTruthy();
    expect(form.get('nombreMascota')?.errors?.['required']).toBeTruthy();
    expect(form.get('razonCita')?.errors?.['required']).toBeTruthy();
    expect(form.get('fecha')?.errors?.['required']).toBeTruthy();
    expect(form.get('hora')?.errors?.['required']).toBeTruthy();
  });

  it('debería validar longitud mínima de campos', () => {
    const form = component.citaForm;

    form.patchValue({
      nombreCliente: 'Jo',
      nombreMascota: 'F',
      razonCita: 'Corto'
    });

    expect(form.get('nombreCliente')?.errors?.['minlength']).toBeTruthy();
    expect(form.get('nombreMascota')?.errors?.['minlength']).toBeTruthy();
    expect(form.get('razonCita')?.errors?.['minlength']).toBeTruthy();
  });

  it('debería despachar la acción loadAvailableSlots al seleccionar una fecha', () => {
    const testDate = new Date('2023-10-10');
    const event = { value: testDate };

    component.onDateSelected(event);

    expect(dispatchSpy).toHaveBeenCalledWith(
      CitasActions.loadAvailableSlots({ date: '2023-10-10' })
    );
    expect(component.citaForm.get('hora')?.value).toBe('');
  });

  it('debería formatear los time slots correctamente', () => {
    const slots = ['2023-10-10T09:00:00Z', '2023-10-10T10:00:00Z'];
    const formattedSlots = component.formatTimeSlots(slots);

    expect(formattedSlots.length).toBe(2);
    expect(formattedSlots[0].datetime).toBe(slots[0]);
    expect(formattedSlots[0].hour).toBeDefined();
  });

  it('debería despachar createCita al enviar un formulario válido', fakeAsync(() => {
    store.overrideSelector(CitasSelectors.selectAvailableSlots, ['2023-10-10T09:00:00Z']);
    store.refreshState();
    fixture.detectChanges();

    const testDate = new Date('2023-10-10');
    const testDateTime = '2023-10-10T09:00:00Z';

    const dateEvent = { value: testDate };
    component.onDateSelected(dateEvent);
    fixture.detectChanges();
    tick();

    component.citaForm.patchValue({
      nombreCliente: 'John Doe',
      nombreMascota: 'Fido',
      razonCita: 'Cita de chequeo general extenso para cumplir con la validación',
      fecha: testDate,
      hora: testDateTime,
      atendida: false
    });

    fixture.detectChanges();
    tick();

    component.citaForm.updateValueAndValidity();
    fixture.detectChanges();
    tick();

    expect(component.citaForm.valid).withContext('El formulario debería ser válido').toBeTrue();

    component.onSubmit();
    tick();

    const expectedCita = {
      nombreCliente: 'John Doe',
      nombreMascota: 'Fido',
      razonCita: 'Cita de chequeo general extenso para cumplir con la validación',
      fechaHora: testDateTime,
      atendida: false
    };

    expect(dispatchSpy).toHaveBeenCalledWith(
      CitasActions.createCita({ cita: expectedCita })
    );

    fixture.destroy();
  }));

  it('debería resetear el formulario al cancelar', () => {
    component.citaForm.patchValue({
      nombreCliente: 'John Doe',
      nombreMascota: 'Fido',
      razonCita: 'Chequeo',
      fecha: new Date(),
      hora: '2023-10-10T09:00:00Z',
      atendida: false
    });

    component.onCancel();

    expect(component.citaForm.get('nombreCliente')?.value).toBe('');
    expect(component.citaForm.get('nombreMascota')?.value).toBe('');
    expect(component.citaForm.get('razonCita')?.value).toBe('');
    expect(component.citaForm.get('fecha')?.value).toBe('');
    expect(component.citaForm.get('hora')?.value).toBe('');
    expect(component.citaForm.get('atendida')?.value).toBe(false);
    expect(component.availableTimeSlots).toEqual([]);
  });

  it('debería filtrar los fines de semana correctamente', () => {
    const saturday = new Date(2023, 9, 14);
    const sunday = new Date(2023, 9, 15);
    const monday = new Date(2023, 9, 16);

    expect(component.weekendFilter(saturday))
      .withContext('Sábado debería ser filtrado (false)')
      .toBeFalse();

    expect(component.weekendFilter(sunday))
      .withContext('Domingo debería ser filtrado (false)')
      .toBeFalse();

    expect(component.weekendFilter(monday))
      .withContext('Lunes no debería ser filtrado (true)')
      .toBeTrue();

    // Probar con null
    expect(component.weekendFilter(null))
      .withContext('Null debería retornar false')
      .toBeFalse();
  });
});
