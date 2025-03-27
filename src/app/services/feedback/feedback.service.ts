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
    const { data, error } = await this._supabase.from('feedback_form').insert({ 
        ...feedbackData, profile_id: currentProfile.id 
    });
    if (error) {
        throw error;
    }
    return data;
  }
}
