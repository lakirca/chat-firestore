import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent implements OnInit {
  name = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  getErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

  async saveName(): Promise<any> {
    if (this.name.valid) {
      const timeStamp = formatDate(new Date(), 'yyyy-MM-dd', 'en');

      const data = {
        name: this.name.value,
        therapist_msg: timeStamp,
        user_msg: timeStamp,
      };

      try {
        this.closeDialog();

        await this.userService.createUser(data);
      } catch (error) {
        alert(error);
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
