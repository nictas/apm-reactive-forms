import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
      firstName: '',
      lastName: '',
      email: '',
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
}
