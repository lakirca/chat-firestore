import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
})
export class UserChatComponent implements OnInit {
  messages$: Observable<any>;
  user$: Observable<User>;
  message: string;

  constructor(
    private firestore: AngularFirestore,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.user$ = this.chatService.currentUser$.asObservable();
    this.getData();
  }

  // On Current Selected User Get Messages for Selected User
  getData(): void {
    this.chatService.getCurrentUser().subscribe((data: any) => {
      if (data) {
        this.messages$ = this.chatService.getMessages(data.uid);
      }
    });
  }

  // Send Message for Current User,
  // and Update *user_msg timestamp value
  sendMessage(user): void {
    const docTime = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const mapTime = formatDate(new Date(), 'HHmmss.SSS', 'en');

    const data = {};
    data[mapTime] = {
      source: user.name,
      text: this.message,
    };

    this.firestore
      .collection('users')
      .doc(user.uid)
      .collection('messages')
      .doc(`${docTime}`)
      .set(data, { merge: true });

    // Update TimeStamp
    this.firestore.collection('users').doc(user.uid).set(
      {
        user_msg: Date.now(),
      },
      { merge: true }
    );
    this.message = '';
  }
}
