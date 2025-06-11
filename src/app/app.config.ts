import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { todoPostComponent } from './feat/components/todo/todo-detail.component';
import { todoPostEffects } from './store/todo/todo.effects';
import { todoPostFeatureKey, todoPostReducer } from './store/todo/todo.reducer';

// Cấu hình ứng dụng standalone
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([{ path: '', component: todoPostComponent }]),
    provideHttpClient(),
    provideStore(),
    provideStore({ [todoPostFeatureKey]: todoPostReducer }),
    provideEffects([todoPostEffects]),
  ],
};
