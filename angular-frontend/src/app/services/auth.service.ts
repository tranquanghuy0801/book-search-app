import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<
    Observable<firebase.User>
  > = new BehaviorSubject<Observable<firebase.User>>(null);

  user$ = this.user
    .asObservable()
    .pipe(switchMap((user: Observable<firebase.User>) => user));

  constructor(private afAuth: AngularFireAuth) {
    this.user.next(this.afAuth.authState);
  }

  loginViaFacebook(): Observable<auth.UserCredential> {
    return from(this.afAuth.signInWithPopup(new auth.FacebookAuthProvider()));
  }

  loginViaTwitter(): Observable<auth.UserCredential> {
    return from(this.afAuth.signInWithPopup(new auth.TwitterAuthProvider()));
  }

  loginViaGoogle(): Observable<auth.UserCredential> {
    return from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  login(value): Observable<auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(value.email, value.password));
  }

  register(value): Observable<auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(value.email,value.password));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
