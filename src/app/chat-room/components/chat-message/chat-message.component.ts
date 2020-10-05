import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() msg: any; // Message
  @Input() predecessor: any; // Message
  @Input() user: any; // User
  @Input() allowsReply = false;

  constructor() {}

  ngOnInit() {}

  getDateDivider(msg: any /* Message */): string {
    if (!msg.createdAt) {
      return null;
    }

    return msg.createdAt.format('l');
  }

  getUserName(user: any /* User */): string {
    if (!user) {
      return null;
    }
    return user.displayName;
  }

  getCreatedDate(msg: any /* Message */): string {
    if (!msg.createdAt) {
      return null;
    }
    return msg.createdAt.format('LT');
  }

  isPredecessorSameAuthor(): boolean {
    if (!this.predecessor) {
      return false;
    }
    return this.predecessor.uid === this.msg.uid;
  }

  isTemporalClose(): boolean {
    if (!this.predecessor) {
      return true;
    }

    // const duration = moment.duration(
    //   this.msg.createdAt.diff(this.predecessor.createdAt)
    // );
    // return duration.asMinutes() <= 1;
  }

  isPreviousMessageFromOtherDay() {
    if (!this.predecessor) {
      return true;
    }
    const prevDate = this.predecessor.createdAt.day();
    const date = this.msg.createdAt.day();
    return prevDate !== date;
  }
}
