import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-invalid-snack-bar',
  templateUrl: './invalid-snack-bar.component.html',
  styleUrls: ['./invalid-snack-bar.component.scss']
})
export class InvalidSnackBarComponent implements OnInit {

  public constructor(public dialogRef: MatDialogRef<InvalidSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public message: any) {
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
