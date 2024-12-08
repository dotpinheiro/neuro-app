import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  constructor(private _authService: AuthService) { }

  async signIn() {
    await this._authService.signInWithGoogle();
  }

  async signOut() {
    await this._authService.signOut();
  }

}
