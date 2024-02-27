import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  collectionName = 'permissions';
  private currentUserRole: string = 'potato';

  constructor(private _firestore: AngularFirestore) {
  }

  setCurrentUserRole(role: string) {
    this.currentUserRole = role;
  }

  getCurrentUserRole(): string {
    return this.currentUserRole;
  }

  loadRole(): Observable<{ role: string }[]> {
    return this._firestore.collection<{ role: string }>(this.collectionName).valueChanges();
  }
}
