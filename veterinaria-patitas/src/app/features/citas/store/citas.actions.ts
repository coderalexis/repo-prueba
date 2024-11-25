import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cita } from '@models/cita.model';

export const CitasActions = createActionGroup({
  source: 'Citas',
  events: {
    'Load Citas': emptyProps(),
    'Load Citas Success': props<{ citas: Cita[] }>(),
    'Load Citas Failure': props<{ error: any }>(),

    'Create Cita': props<{ cita: Cita }>(),
    'Create Cita Success': props<{ cita: Cita }>(),
    'Create Cita Failure': props<{ error: any }>(),

    'Delete Cita': props<{ id: number }>(),
    'Delete Cita Success': props<{ id: number }>(),
    'Delete Cita Failure': props<{ error: any }>(),

    'Load Available Slots': props<{ date: string }>(),
    'Load Available Slots Success': props<{ slots: string[] }>(),
    'Load Available Slots Failure': props<{ error: any }>(),
  }
});
