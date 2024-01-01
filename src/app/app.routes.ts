import { Routes } from '@angular/router';

import { MinimalFormComponent } from './minimalForm';
import { FormBuilderComponent } from './formBuilder';

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
  }
];

