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
    return data.user as User;
  }

  async getUserProfileId():Promise<number> {
    const currentUser = await this.getCurrentUser();
    const { data, error } = await this._supabase
      .from('user_profiles')
      .select("id")
      .eq("user_id", currentUser.id)

    return(data?.[0].id)
  }
}
