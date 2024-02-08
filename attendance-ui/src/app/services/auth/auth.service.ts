import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  isLoggedIn() {
    return !!this.auth.currentUser;
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return this.auth.signOut();
  }
}

