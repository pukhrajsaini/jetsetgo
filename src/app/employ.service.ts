import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Employ } from './modals/employ.modal';

@Injectable({
  providedIn: 'root'
})
export class EmployService {

  constructor(
    private $fb: FormBuilder
  ) { }

  getEmployees(): Observable<any> {
    return of(employData);
  }

  employForm(): FormGroup {
    return this.$fb.group({
      id: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      dob: [null, Validators.required],
      contact: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      skills: [null, Validators.required]
    });
  }
}


const employData: Employ[] = [
  {
    id: 'tech01',
    firstName: 'amit',
    lastName: 'kumar',
    dob: '1990-02-01 00:00:00',
    contact: '9050403020',
    email: 'amit@as.cc',
    skills: ['html', 'ror', 'angular'],
  },
  {
    id: 'tech02',
    firstName: 'rahul',
    lastName: 'shah',
    dob: '1990-02-01 00:00:00',
    contact: '9050403020',
    email: 'rahul@as.cc',
    skills: ['html', 'ror', 'js'],
  }
];
