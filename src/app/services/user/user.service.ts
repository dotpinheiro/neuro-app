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

      const { data: user_profile, error: userProfileError } =
        await this._supabase
          .from('user_profiles')
          .select()
          .eq('user_id', supabaseUser?.id)
          .eq('scope', 'user')
          .maybeSingle();

      if (userProfileError) {
        throw userProfileError;
      }

      if (!user_profile) {
        const { data: profile, error: profileError } = await this._supabase
          .from('profiles')
          .insert({
            ...userData,
          })
          .select()
          .single();

        if (profileError) {
          throw profileError;
        }

        const { error: user_profileError } = await this._supabase
          .from('user_profiles')
          .insert({
            user_id: supabaseUser?.id,
            profile_id: profile.id,
            scope: 'user',
          })
          .select();

        if (user_profileError) {
          throw user_profileError;
        }

        return profile;
      } else {
        const { data: profile, error: profileError } = await this._supabase
          .from('profiles')
          .update({
            ...userData,
          })
          .eq('id', user_profile.profile_id)
          .select();

        if (profileError) {
          throw profileError;
        }

        return profile;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
