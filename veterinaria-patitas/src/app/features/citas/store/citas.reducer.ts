import { createReducer, on } from '@ngrx/store';
import { Cita } from '@models/cita.model';
import { CitasActions } from './citas.actions';

export interface CitasState {
  citas: Cita[];
  availableSlots: string[];
  loading: boolean;
  loadingSlots: boolean;
  error: any;
}

export const initialState: CitasState = {
  citas: [],
  availableSlots: [],
  loading: false,
  loadingSlots: false,
  error: null
};

export const citasReducer = createReducer(
  initialState,
  on(CitasActions.loadCitas, state => ({
    ...state,
    loading: true
  })),
  on(CitasActions.loadCitasSuccess, (state, { citas }) => ({
    ...state,
    citas,
    loading: false
  })),
  on(CitasActions.loadCitasFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(CitasActions.createCitaSuccess, (state, { cita }) => ({
    ...state,
    citas: [...state.citas, cita]
  })),
  on(CitasActions.deleteCitaSuccess, (state, { id }) => ({
    ...state,
    citas: state.citas.filter(cita => cita.id !== id)
  })),
  on(CitasActions.loadAvailableSlots, state => ({
    ...state,
    loadingSlots: true
  })),
  on(CitasActions.loadAvailableSlotsSuccess, (state, { slots }) => ({
    ...state,
    availableSlots: slots,
    loadingSlots: false
  })),
  on(CitasActions.loadAvailableSlotsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingSlots: false,
    availableSlots: []
  }))
);
