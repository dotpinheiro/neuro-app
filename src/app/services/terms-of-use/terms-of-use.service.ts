import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class TermsOfUseService {

  constructor(
    private _supabase: SupabaseClient
  ) { }

  async acceptTerms(userId: string) {
    const { data, error } = await this._supabase.from('terms_acceptance').insert([{ user_id: userId }]);
    if (error) {
      throw error;
    }
    return data;
  }
}
