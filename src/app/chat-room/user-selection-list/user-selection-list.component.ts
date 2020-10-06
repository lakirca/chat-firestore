import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from 'src/app/chat-room/components/create-user-dialog/create-user-dialog.component';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-selection-list',
  templateUrl: './user-selection-list.component.html',
  styleUrls: ['./user-selection-list.component.scss'],
})
export class UserSelectionListComponent implements OnInit {
  users$: Observable<User[]>;

  currentUser$: Observable<User>;

  constructor(public chatService: ChatService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.users$ = this.chatService.getUsers();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.chatService.currentUser$.subscribe((data) => {
      this.currentUser$ = this.chatService.getUserByUid(data.uid);
    });
  }

  openDialog(): void {
    this.dialog.open(CreateUserDialogComponent);
  }

  selectCurrentUser(user): void {
    this.chatService.selectUser(user);
  }

  markRead(user) {
    this.chatService.markRead(user);
  }
}
