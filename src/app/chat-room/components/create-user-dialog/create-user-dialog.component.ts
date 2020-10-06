import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';

function isForbidden(forbiddenValues: string[]): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (forbiddenValues.indexOf(c.value.toLowerCase()) !== -1) {
      return { forbiddenValues: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent implements OnInit {
  name = new FormControl('', [Validators.required, isForbidden(['therapist'])]);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {}

  getErrorMessage(): string {
    const name = this.name.value.toLowerCase();

    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    if (name === 'therapist') {
      return 'That name is Forbidden';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

  async saveName(): Promise<any> {
    if (this.name.valid) {
      const timeStamp = Date.now();

      const data = {
        name: this.name.value,
        therapist_msg: timeStamp,
        user_msg: timeStamp,
      };

      try {
        this.closeDialog();

        await this.chatService.createUser(data);
      } catch (error) {
        alert(error);
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
