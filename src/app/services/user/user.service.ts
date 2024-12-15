import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _supabase: SupabaseClient, private _router: Router) {}

  async updateUser(userId: string, userData: any): Promise<any> {
    try {
      const { data, error } = await this._supabase
        .from('users')
        .update(userData)
        .eq('id', userId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
