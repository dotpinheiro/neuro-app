import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private _supabase: SupabaseClient, 
    private _profileService: ProfileService
) {}

  async saveFeedback(feedbackData: { humor: number; sintomas: string }) {
    const currentProfile = await this._profileService.getCurrentProfile();
    /*
    
    criar tabela no supabase chamada feedback_form
    
    CREATE TABLE feedback_form (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    humor INTEGER NOT NULL,
    sintomas TEXT NOT NULL,
    profile_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT now()
    ); 
    
    */
    const { data, error } = await this._supabase.from('feedback_form').insert({ 
        ...feedbackData, profile_id: currentProfile.id 
    });
    if (error) {
        throw error;
    }
    return data;
  }
}
