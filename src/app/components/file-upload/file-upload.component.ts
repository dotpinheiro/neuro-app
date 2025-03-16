import { Component } from '@angular/core';
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

  constructor(private _imageStorageService: ImageStorageService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && this.allowedTypes.includes(file.type)) {
      this.selectedFile = event;
      this.onUpload();
    } else {
      alert('Por uma imagem com formato válido (JPEG, PNG or PDF)');
      input.value = '';
      this.selectedFile = null;
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this._imageStorageService.uploadImage(this.selectedFile);
    }
  }
}
