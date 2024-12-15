import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private _supabase: SupabaseClient,
    private _router: Router
  ) { }

  async signInWithGoogle() {
    return this._supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  }

  async signInWithFacebook() {
    return this._supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: window.location.origin
      }
    });
  }

  async signOut() {
    await this._supabase.auth.signOut();
    await this._router.navigate(['/auth']);
  }

}
