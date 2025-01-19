import {Injectable} from '@angular/core';
import {SupabaseClient} from "@supabase/supabase-js";
import {ProfileInterface, ProfileScopes} from "./profile.interface";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _supabase: SupabaseClient, private _userService: UserService) { }

  async getProfiles(userId: string): Promise<ProfileInterface[]> {
    const { data, error } = await this._supabase
      .from('user_profiles')
      .select(`
        id,
        user_id,
        profile_id,
        scope,
        profile: profile_id (name, age, sex, height, weight, medication_started_at, img)
      `)
      .eq('user_id', userId)
      .eq('scope', 'user')


    if(error){
      throw error;
    }

    return data as unknown as ProfileInterface[];
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

  async createProfile(profileData: ProfileInterface, scope: ProfileScopes = ProfileScopes.USER) {
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
