import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { selectAllCitas } from '@features/citas/store/citas.selectors';
import { CitasActions } from '@features/citas/store/citas.actions';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Cita } from '@models/cita.model';
import { FormsModule } from '@angular/forms';
import { CitaDetailsDialogComponent } from '@features/citas/components/cita-details-dialog/cita-details-dialog.component';


@Component({
  selector: 'app-cita-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.css']
})
export class CitaListComponent implements OnInit {
  selectedDateSubject = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDateSubject.asObservable();
  selectedDate = new Date();

  allCitas$ = this.store.select(selectAllCitas);

  filteredCitas$ = combineLatest([this.allCitas$, this.selectedDate$]).pipe(
    map(([citas, selectedDate]) => {
      return this.filterAndSortCitas(citas, selectedDate);
    })
  );

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(CitasActions.loadCitas());
  }

  onDateSelected(event: any) {
    this.selectedDateSubject.next(event.value);
  }

  openDetailsDialog(cita: Cita) {
    this.dialog.open(CitaDetailsDialogComponent, {
      data: cita,
      width: '400px'
    });
  }

  deleteCita(id: number | undefined) {
    if (id !== undefined) {
      this.store.dispatch(CitasActions.deleteCita({ id }));
    }
  }

  private filterAndSortCitas(citas: Cita[], selectedDate: Date): Cita[] {
    return citas
      .filter(cita => {
        const citaDate = new Date(cita.fechaHora);
        return citaDate.toDateString() === selectedDate.toDateString();
      })
      .sort((a, b) => {
        const dateA = new Date(a.fechaHora).getTime();
        const dateB = new Date(b.fechaHora).getTime();
        return dateA - dateB;
      });
  }
}
