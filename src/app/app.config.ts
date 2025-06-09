import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { todoFeature, TodoEffects } from './store/todo.store';
import { TodoComponent } from './feat/components/todo/todo.component';

// Cấu hình ứng dụng standalone
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([{ path: '', component: TodoComponent }]),
    provideHttpClient(),
    provideStore(),
    provideState(todoFeature),
    provideEffects([TodoEffects]),
  ],
};
