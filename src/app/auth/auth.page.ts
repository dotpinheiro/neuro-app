import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  constructor(private _authService: AuthService) { }

  async signIn(method:string) {
    switch (method) {
      case 'google': {
        return this._authService.signInWithGoogle();
      }
      case 'facebook': {
        return this._authService.signInWithFacebook();
      }
      default: {
        return;
      }
    }
  }

  async signOut() {
    await this._authService.signOut();
  }

}
