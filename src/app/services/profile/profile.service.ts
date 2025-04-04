import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { ProfileResponse } from 'src/app/components/select/select.component';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserService } from '../user/user.service';
import {
  ProfileInterface,
  ProfileScopes,
  UserProfiles,
} from './profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private _supabase: SupabaseClient,
    private _userService: UserService,
    private _localStorage: LocalStorageService
  ) {}

  async getCurrentProfileInfo(id: number): Promise<ProfileInterface> {
    const { data, error } = await this._supabase
      .from('profiles')
      .select('*')
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data[0] as unknown as ProfileInterface;
  }

  async getCurrentProfile() {
    const currentUser = await this._userService.getCurrentUser();
    const { data, error } = await this._supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', currentUser.id);

    if (error) {
      throw error;
    }

    const profileId = this._localStorage.getItem<number>('profileId');
    if (profileId) {
      return data.filter(
        (item) => item.id === profileId
      )[0] as unknown as UserProfiles;
    }

    return data![0] as unknown as UserProfiles;
  }

  async getProfiles(userId: string): Promise<ProfileResponse[]> {
    const { data, error } = await this._supabase
      .from('user_profiles')
      .select(
        `
        id,
        user_id,
        profile_id,
        scope,
        profile: profile_id (name, age, sex, height, weight, medication_started_at, img)
      `
      )
      .eq('user_id', userId)
      .eq('scope', 'user');

    if (error) {
      throw error;
    }

    return data as unknown as ProfileResponse[];
  }

  async updateProfile(profileData: ProfileInterface) {
    const { data: profile, error: profileError } = await this._supabase
      .from('profiles')
      .update({
        ...profileData,
      })
      .eq('id', profileData.id)
      .select();

    if (profileError) {
      throw profileError;
    }

    return profile;
  }

  async createProfile(
    profileData: ProfileInterface,
    scope: ProfileScopes = ProfileScopes.USER
  ) {
    const currentUser = await this._userService.getCurrentUser();
    const { data: profileResponse, error: profileError } = await this._supabase
      .from('profiles')
      .insert({
        ...profileData,
      })
      .select()
      .maybeSingle();

    if (profileError) {
      throw profileError;
    }

    const { data: profile, error: user_profileError } = await this._supabase
      .from('user_profiles')
      .insert({
        user_id: currentUser.id,
        profile_id: profileResponse.id,
        scope,
      })
      .select();

    if (user_profileError) {
      throw user_profileError;
    }

    return profile;
  }
}
