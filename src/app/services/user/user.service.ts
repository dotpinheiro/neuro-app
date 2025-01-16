import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _supabase: SupabaseClient, private _router: Router) {}

  async updateUser(userData: any): Promise<any> {
    try {
      const {
        data: { user: supabaseUser },
        error: supabaseUserError,
      } = await this._supabase.auth.getUser();

      if (supabaseUserError) {
        console.error('Error fetching user from supabase:', supabaseUserError);
        throw supabaseUserError;
      }

      const { data: user, error: userError } = await this._supabase
        .from('users')
        .select()
        .eq('email', supabaseUser?.email)
        .single();

      if (userError) {
        console.error('Error fetching user from supabase:', userError);
        throw userError;
      }

      if (!user) {
        throw new Error('User not found with email: ' + supabaseUser?.email);
      }

      const { data, error } = await this._supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...userData,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      const { error: updateError } = await this._supabase
        .from('user_profiles')
        .upsert({ user_id: user.id, profile_id: data.id, scope: 'user' });

      if (updateError) {
        throw updateError;
      }

      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
