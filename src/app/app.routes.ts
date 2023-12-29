import { Routes } from '@angular/router';

import { MinimalFormComponent } from './minimalForm';
import { FormBuilderComponent } from './formBuilder';
import { ValidationFormComponent } from './validationForm';

export const routes: Routes = [
  {
    path: '',
    component: MinimalFormComponent,
    title: 'Minimal Form'
  },
  {
    path: 'formbuilder',
    component: FormBuilderComponent,
    title: 'FormBuilder'
  },
  {
    path: 'validation',
    component: ValidationFormComponent,
    title: 'Validation'
  }
];

