import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Result } from '../../model/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.scss']
})
export class RentModalComponent implements OnInit {


  public form: FormGroup;
  public grillModels: string[] = ['Gas grills', 'Infrared grills', 'Charcoal grills'];
  public loading: boolean;

  public constructor(
  public dialogRef: MatDialogRef<RentModalComponent>,
  @Inject(MAT_DIALOG_DATA) public result: Result) {
      this.form = new FormGroup({
        model: new FormControl(null, [Validators.required]),
        date: new FormControl(null, [Validators.required])
      });
      console.log(result);
  }


  public ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    console.log(this.form.value);
    this.loading = true;
  }

}
