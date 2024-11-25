import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CitasActions } from '@features/citas/store/citas.actions';
import { CitasSelectors } from '@features/citas/store/citas.selectors';
import { TimeSlot } from '@models/cita.model';


@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css']
})
export class CitaFormComponent implements OnInit {

  @ViewChild('picker') datePicker!: MatDatepicker<Date>;
  citaForm: FormGroup = this.initForm();
  minDate: Date = new Date();
  availableTimeSlots: TimeSlot[] = [];

  weekendFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const day = d.getDay();
    return day !== 0 && day !== 6;
  };

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.minDate = new Date();
    this.initForm();
  }

  ngOnInit() {
    this.store.select(CitasSelectors.selectAvailableSlots).subscribe(
      slots => {
        this.availableTimeSlots = this.formatTimeSlots(slots);
      }
    );
  }

  private initForm(): FormGroup {
    return this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      nombreMascota: ['', [Validators.required, Validators.minLength(2)]],
      razonCita: ['', [Validators.required, Validators.minLength(10)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      atendida: [false]
    });
  }

  onDateSelected(event: any) {
    const selectedDate = event.value;
    if (selectedDate) {
      // Formatear la fecha como 'YYYY-MM-DD'
      const formattedDate = selectedDate.toISOString().split('T')[0];
      this.store.dispatch(CitasActions.loadAvailableSlots({ date: formattedDate }));
      // Resetear la selección de hora
      this.citaForm.patchValue({ hora: '' });
    }
  }

  formatTimeSlots(slots: string[]): TimeSlot[] {
    return slots.map(datetime => {
      const date = new Date(datetime);
      return {
        hour: date.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        datetime: datetime
      };
    });
  }

  onSubmit() {
    if (this.citaForm.valid) {
      const formValues = this.citaForm.value;

      const cita = {
        nombreCliente: formValues.nombreCliente,
        nombreMascota: formValues.nombreMascota,
        razonCita: formValues.razonCita,
        fechaHora: formValues.hora,
        atendida: false
      };

      this.store.dispatch(CitasActions.createCita({ cita }));

      // Resetear el formulario y el estado
      this.resetForm();
    }
  }

  private resetForm() {
    // Resetear el formulario con valores iniciales
    this.citaForm.reset({
      nombreCliente: '',
      nombreMascota: '',
      razonCita: '',
      fecha: '',
      hora: '',
      atendida: false
    }, { emitEvent: false });

    this.availableTimeSlots = [];

    Object.keys(this.citaForm.controls).forEach(key => {
      const control = this.citaForm.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });

    if (this.datePicker) {
      this.datePicker.close();
    }
  }

  onCancel() {
    this.resetForm();
  }
}
