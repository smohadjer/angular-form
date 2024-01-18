import {
  FormControl,
  FormGroup,
  FormArray,
} from '@angular/forms';

interface Phone {
  label: FormControl;
  number: FormControl;
};

interface Address {
  street: FormControl,
  state: FormControl
}

export interface Form {
  name: FormControl<string | null>,
  email: FormControl<string | null>
  birthday: FormControl<string | null>
  gender: FormControl<string | null>
  address?: FormGroup<Address>
  privacy: FormControl<boolean>,
  phones: FormArray<FormGroup<Phone>>,
  interests: FormArray<FormControl<boolean>>,
  comments: FormControl<string>
  rating?: FormControl<number>
}
