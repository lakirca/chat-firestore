import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAction } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-therapist-chat',
  templateUrl: './therapist-chat.component.html',
  styleUrls: ['./therapist-chat.component.scss'],
})
export class TherapistChatComponent implements OnInit {
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

  getData(): void {
    this.chatService.getCurrentUser().subscribe((data: any) => {
      if (data) {
        this.messages$ = this.chatService.getMessages(data.uid);
      }
    });
  }

  sendMessage(user): void {
    const docTime = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const mapTime = formatDate(new Date(), 'HHMMSS.sss', 'en');

    const data = {};
    data[mapTime] = {
      source: 'Therapist',
      text: this.message,
    };

    this.firestore.collection('users').doc(user.uid).set(
      {
        therapist_msg: Date.now(),
      },
      { merge: true }
    );

    // Add For Current User
    this.firestore
      .collection('users')
      .doc(user.uid)
      .collection('messages')
      .doc(`${docTime}`)
      .set(data, { merge: true });

    this.message = '';
  }

  private scrollBottom(): void {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
}
