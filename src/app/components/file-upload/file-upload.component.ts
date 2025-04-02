import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ImageStorageService } from 'src/app/services/image-storage/image-storage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  selectedFile: Event | null = null;
  uploadProgress = 0;
  private allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    constructor(private _imageStorageService: ImageStorageService,private toastController: ToastController) {}

  async onFileSelected(event: Event): Promise<string> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && this.allowedTypes.includes(file.type)) {
      this.selectedFile = event;
      return this.onUpload();
    } else {
      const toast = await this.toastController.create({
        message:'Colocar uma imagem com formato válido (JPEG, PNG or PDF)',
        duration: 2000,
        color : 'danger'
      })
      await toast.present()
      input.value = '';
      this.selectedFile = null;

      return ''
    }
  }

  onUpload(): string {
    if (this.selectedFile) {
      this._imageStorageService.uploadImage(this.selectedFile);
    }
    return ''
  }
}
