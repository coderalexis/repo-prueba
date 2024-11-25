import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CitasState } from '@features/citas/store/citas.reducer';

export const selectCitasState = createFeatureSelector<CitasState>('citas');

export const selectAllCitas = createSelector(
  selectCitasState,
  (state) => state.citas
);

export const selectCitasLoading = createSelector(
  selectCitasState,
  (state) => state.loading
);

export const selectCitasError = createSelector(
  selectCitasState,
  (state) => state.error
);

export const selectAvailableSlots = createSelector(
  selectCitasState,
  (state) => state.availableSlots
);

export const selectLoadingSlots = createSelector(
  selectCitasState,
  (state) => state.loadingSlots
);

export const CitasSelectors = {
  selectAllCitas,
  selectCitasLoading,
  selectCitasError,
  selectAvailableSlots,
  selectLoadingSlots
};
