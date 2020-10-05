import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
})
export class UserChatComponent implements OnInit {
  @Input() height: string;
  @Input() width: string;

  chat$: Observable<any>;
  user$: Observable<any> = undefined;
  messages: any[] = [];

  constructor(
    private afs: AngularFirestore // public auth: FirebaseAuthService // public chatService: FirebaseChatService,
  ) {}

  ngOnInit() {
    // const chatId = this.route.snapshot.paramMap.get('id');
    // TODO: first load already existing history
    // TODO: listen on changes
    // const source = this.chatService.getHistory(chatId);
    // this.chat$ = this.chatService.buildChat(source).pipe(
    // tap((res) => this.integrateNewMessages(res)),
    // tap(() => this.scrollBottom())
    // );
  }

  private integrateNewMessages(chat) {
    const newMessages = chat.messages.filter(
      (newMessage: any /* Message */) =>
        !this.messages.some((message: any /* Message */) =>
          this.isSameMessage(message, newMessage)
        )
    );
    newMessages.forEach((msg) => this.messages.push(msg));
  }

  private isSameMessage(
    message: any /* Message */,
    newMessage: any /* Message */
  ): boolean {
    return (
      message.content === newMessage.content &&
      message.uid === newMessage.uid &&
      message.createdAt.isSame(newMessage.createdAt)
    );
  }

  trackByCreated(msg) {
    return msg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
}
