import { ApplicationConfig, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { citasReducer } from './features/citas/store/citas.reducer';
import { CitasEffects } from './features/citas/store/citas.effects';
import { MAT_DATE_LOCALE } from '@angular/material/core';

// Importar lo necesario para el locale
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registrar el locale
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore({ citas: citasReducer }),
    provideEffects([CitasEffects]),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es' }, // Añadimos esta línea
    provideAnimationsAsync(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ]
};
