import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { TodoEffects } from './store/todo/todo.effects';
import { featureKey, todoReducer } from './store/todo/todo.reducer';

// Cấu hình ứng dụng standalone
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ [featureKey]: todoReducer }),
    provideEffects([TodoEffects]),
  ],
};
