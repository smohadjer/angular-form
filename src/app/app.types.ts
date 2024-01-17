import {
  FormControl,
  FormGroup,
  FormArray,
} from '@angular/forms';

interface IPhone {
  label: FormControl;
  number: FormControl;
};

export interface IForm {
  name: FormControl,
  email: FormControl,
  birthday: FormControl,
  gender: FormControl,
  address?: FormGroup,
  privacy: FormControl,
  phones: FormArray<FormGroup<IPhone>>,
  interests: FormArray<FormControl>,
  comments: FormControl
}
