import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  markRead(user: User): void {
    this.firestore
      .collection<User>('users')
      .doc(`${user.uid}`)
      .set({ therapist_msg: user.user_msg }, { merge: true });
  }

  selectUser(user): void {
    this.currentUser$.next(user);
  }

  // Snapshot Listener
  getMessages(uid): Observable<any> {
    return this.firestore
      .collection<User>('users')
      .doc(uid)
      .collection<any>('messages')
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data())),
        map((payload) => payload[0])
      );
  }
}
