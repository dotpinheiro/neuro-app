import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ImageStorageService {
  constructor(
    private _supabaseClient: SupabaseClient,
    private _userService: UserService
  ) {}

  async uploadImage(e: any) {
    try {
      let file = e.target.files[0];
      const user = await this._userService.getCurrentUser();
      const { data, error } = await this._supabaseClient.storage
        .from('Images')
        .upload(user.id + '/' + uuidv4(), file);
      if (data) {
        this.getMedia();
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async getMedia() {
    const user = await this._userService.getCurrentUser();

    const { data, error } = await this._supabaseClient.storage
      .from('Images')
      .list(user.id + '/', {});
    console.log('data', data);
  }
}
