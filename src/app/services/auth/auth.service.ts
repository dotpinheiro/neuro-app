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
    const res = await this._supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/tabs'
      }
    });
    return res;
  }

  async signOut() {
    await this._supabase.auth.signOut();
    this._router.navigate(['/auth']);
  }

}
