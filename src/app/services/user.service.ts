import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$: Observable<any>;
  newId = this.firestore.createId();

  constructor(private firestore: AngularFirestore) {}

  createUser(data): Promise<any> {
    const newData = new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('users')
        .doc(`${this.newId}`)
        .set(data)
        .then(
          (res) => res,
          (err) => reject(err)
        );
    });
    return newData;
  }

  getUsers(): Observable<any> {
    return this.firestore.collection<any>('users').valueChanges();
    // .snapshotChanges()
    // .stateChanges()
    // .auditTrail()
  }

  getUserByUid(uid = '5OiRJs8dq7UjE5HJCwKG2qQe3Ky1'): Observable<any> {
    const currentDoc = this.firestore.collection<any>('users').doc(`${uid}`);
    return currentDoc.snapshotChanges().pipe(
      map((changes: any) => {
        const data = changes.payload.data();

        return data;
      })
    );
  }
}
