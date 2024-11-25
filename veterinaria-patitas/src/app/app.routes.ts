import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'nueva-cita',
    loadComponent: () =>
      import('./features/citas/components/cita-form/cita-form.component')
        .then(m => m.CitaFormComponent)
  },
  {
    path: 'lista-citas',
    loadComponent: () =>
      import('./features/citas/components/cita-list/cita-list.component')
        .then(m => m.CitaListComponent)
  },
  { path: '**', redirectTo: '' }
];
