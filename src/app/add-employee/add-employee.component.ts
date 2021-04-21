import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployService } from '../employ.service';
import { Employ } from '../modals/employ.modal';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employForm: FormGroup = this.$employService.employForm();
  isEditable = false;

  skills = ['angular', 'html', 'css', 'nodejs', 'mongodb', 'mysql'];
  constructor(
    private $employService: EmployService,
    private $dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public employ: Employ
  ) {
    if (this.employ) {
      this.isEditable = true;
      employ.dob = new Date(employ.dob);
      console.log(employ);
      this.employForm.patchValue(employ);
    }
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.$dialogRef.close(null);
  }

  onSubmit(): void {
    const employData = this.employForm.value;
    this.$dialogRef.close(employData);
  }


}
