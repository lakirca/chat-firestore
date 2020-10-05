import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from 'src/app/chat-room/components/create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-user-selection-list',
  templateUrl: './user-selection-list.component.html',
  styleUrls: ['./user-selection-list.component.scss'],
})
export class UserSelectionListComponent implements OnInit {
  users$: Observable<any[]>;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
    this.users$ = this.userService.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((user) => {
      console.log('Current User', user);
    });
  }

  getCurrentUser(): any {}

  openDialog(): void {
    this.dialog.open(CreateUserDialogComponent);
  }
}
