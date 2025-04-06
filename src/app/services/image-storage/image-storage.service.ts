import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';
import { retry } from 'rxjs';
import { ExceptionCode } from '@capacitor/core';

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
      const { data } = await this._supabaseClient.storage
        .from('gallery')
        .upload(user.id + '/' + uuidv4(), file);
      console.log(data);
      // return path, fullPath and ID
      return data;
    } catch (error) {
      throw new Error('Error to upload image: ' + error);
    }
  }

  async getMedia() {
    const user = await this._userService.getCurrentUser();

    const { data, error } = await this._supabaseClient.storage
      .from('gallery')
      .list(user.id + '/', {});
  }
}
