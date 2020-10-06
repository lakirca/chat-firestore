import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  isLoading$: Observable<any>;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.isLoading$ = combineLatest([
      this.chatService.getCurrentUser(),
      this.chatService.getUsers(),
    ]);
  }
}
