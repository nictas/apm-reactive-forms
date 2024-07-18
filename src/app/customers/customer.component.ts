import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

function emailsMatch(control: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = control.get('email');
  const confirmEmailControl = control.get('confirmEmail');

  if (emailControl?.pristine || confirmEmailControl?.pristine) {
    return null;
  }

  if (emailControl?.value !== confirmEmailControl?.value) {
    return { 'match': true };
  }
  return null;
}

function range(min: number, max: number): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value !== null && (isNaN(control.value) || control.value < min || control.value > max)) {
      return { 'range': true };
    }
    return null;
  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customer = new Customer();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validators: emailsMatch }),
      phone: '',
      notification: 'email',
      rating: [null, range(1, 5)],
      sendCatalog: true
    });
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: "Jack",
      lastName: "Harkness",
      sendCatalog: false
    })
  }

  setNotification(notificationValue: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notificationValue === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
}
