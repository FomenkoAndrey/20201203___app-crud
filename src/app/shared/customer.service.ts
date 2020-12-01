import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

const url = 'https://app-crud-82afd.firebaseio.com/customers';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers: Customer[] = [];

  constructor(public http: HttpClient, private fb: FormBuilder) { }

  form = this.fb.group({
    key: [null],
    name: ['', Validators.required],
    email: ['', Validators.email],
    mobile: ['', [Validators.required, Validators.minLength(8)]],
    location: ['', Validators.required],
  });

  insertCustomer(customer: Customer): void {

    console.log(customer);

    // this.http.post<Customer>(`${url}.json`, customer, httpOptions)
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     },
    //     err => console.log(err));
  }

  getCustomersList(): void {
    this.http.get<Customer[]>(`${url}.json`, httpOptions)
      .subscribe(
        res => {
          Object.keys(res).forEach(key => {
            const obj = Object.assign({}, res[key]);
            obj.key = key;
            this.customers.push(obj);
          });
        },
        err => console.log(err)
      );
  }
}
