import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  cu: any;

  constructor(private firestore: AngularFirestore) {}

  getCurrentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  getUserByUid(uid): Observable<any> {
    return this.firestore
      .collection<any>('users')
      .valueChanges({ idField: 'uid' })
      .pipe(
        map((payload) => payload.filter((user) => user.uid === uid)),
        map((users) => users[0])
      );
  }

  getUsers(): Observable<User[]> {
    return this.firestore
      .collection<User>('users')
      .valueChanges({ idField: 'uid' })
      .pipe(
        tap((users: User[]) => {
          if (!this.currentUser$.getValue()) {
            this.currentUser$.next(users[0]);
          }
        })
      );
  }

  createUser(data): Promise<User> {
    const newId = this.firestore.createId();
    const newData = new Promise<User>((resolve, reject) => {
      this.firestore
        .collection('users')
        .doc(`${newId}`)
        .set(data)
        .then(
          (res) => res,
          (err) => reject(err)
        );
    });
    return newData;
  }

  markRead(user: User): Promise<any> {
    const newData = new Promise<User>((resolve, reject) => {
      this.firestore
        .collection<User>('users')
        .doc(`${user.uid}`)
        .set({ therapist_msg: user.user_msg }, { merge: true })
        .then(
          (res) => res,
          (err) => reject(err)
        );
    });

    return newData;
  }

  selectUser(user): void {
    this.currentUser$.next(user);
  }

  // Snapshot Listener
  getMessages(uid): Observable<any> {
    const docTime = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    return this.firestore
      .collection<User>('users')
      .doc(uid)
      .collection<any>('messages')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            if (id === docTime) {
              return data;
            } else {
              return [];
            }
          })
        ),
        map((payload) => {
          return payload[0];
        })
      );
  }
}
