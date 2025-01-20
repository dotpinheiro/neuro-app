import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _supabase: SupabaseClient, private _router: Router) {}

  async getCurrentUser(): Promise<User> {
    const { data, error } = await this._supabase.auth.getUser();
    if (error) {
      throw error;
    }
    console.log(data);
    return data.user as User;
  }
}
