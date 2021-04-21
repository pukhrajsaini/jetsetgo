import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

  constructor(
    private $dialogRef: MatDialogRef<ConfirmBoxComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(status: boolean): void {
    this.$dialogRef.close(status);
  }

}
