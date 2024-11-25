import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CitaService } from '@services/cita.service';
import { CitasActions } from './citas.actions';

@Injectable()
export class CitasEffects {
  loadCitas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CitasActions.loadCitas),
      mergeMap(() => this.citasService.getCitas()
        .pipe(
          map(citas => CitasActions.loadCitasSuccess({ citas })),
          catchError(error => of(CitasActions.loadCitasFailure({ error })))
        ))
    )
  );

  createCita$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CitasActions.createCita),
      mergeMap(({ cita }) => this.citasService.createCita(cita)
        .pipe(
          map(newCita => CitasActions.createCitaSuccess({ cita: newCita })),
          catchError(error => of(CitasActions.createCitaFailure({ error })))
        ))
    )
  );

  deleteCita$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CitasActions.deleteCita),
      mergeMap(({ id }) => this.citasService.deleteCita(id)
        .pipe(
          map(() => CitasActions.deleteCitaSuccess({ id })),
          catchError(error => of(CitasActions.deleteCitaFailure({ error })))
        ))
    )
  );

  loadAvailableSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CitasActions.loadAvailableSlots),
      mergeMap(({ date }) => this.citasService.getAvailableSlots(date)
        .pipe(
          map(slots => CitasActions.loadAvailableSlotsSuccess({ slots })),
          catchError(error => of(CitasActions.loadAvailableSlotsFailure({ error })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private citasService: CitaService
  ) {}
}
