import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxCroppedEvent, NgxPhotoEditorService, Options} from 'ngx-photo-editor';
import {MessageService} from 'primeng/api';
import {FileUpload} from 'primeng/fileupload';
import {ApiService, BlobService, UserDataService} from '@shared/services';
import {ProfilePhoto} from '@shared/models';
import {DeleteProfilePhotoCommand, UploadProfilePhotoCommand} from '@shared/models/commands';


@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.scss'],
})
export class PhotosTabComponent implements OnInit {
  private readonly photoEditorOptions: Options;
  public images: ProfilePhoto[];
  public currentImageIndex: number;
  public uploadedImage: string | null;
  public isBusy: boolean;

  @ViewChild('fileUploader') fileUploader!: FileUpload;

  constructor(
    private apiService: ApiService,
    private blobService: BlobService,
    private userDataService: UserDataService,
    private photoEditor: NgxPhotoEditorService,
    private messageService: MessageService)
  {
    this.uploadedImage = null;
    this.isBusy = false;
    this.currentImageIndex = 0;
    this.images = [];

    this.photoEditorOptions = {
      autoCropArea: 1,
      imageQuality: 90,
      format: 'jpeg',
      resizeToHeight: 1080,
      viewMode: 1,
    };

    this.images = [
      {
        photoUrl: '/assets/image/1.jpg',
      },
      {
        photoUrl: '/assets/image/2.jpg',
      },
      {
        photoUrl: '/assets/image/3.jpg',
      },
      {
        photoUrl: '/assets/image/4.jpg',

      },
      {
        photoUrl: '/assets/image/5.jpg',
      },
    ];
  }

  ngOnInit(): void {
    this.fetchProfilePhotos();
  }

  uploadImage(event: FileUploadEvent) {
    const imageFile = event.files[0];

    this.photoEditor.open(imageFile, this.photoEditorOptions)
        .subscribe(this.photoEditorHandler.bind(this));

    this.fileUploader.clear();
  }

  deletePhoto() {
    const selectedImage = this.images[this.currentImageIndex];
    const userId = this.userDataService.getUserId();
    const command: DeleteProfilePhotoCommand = {
      userId: userId!,
      photoId: selectedImage.photoId!,
    };

    this.isBusy = true;
    this.blobService.removeFile(selectedImage.photoUrl!);

    this.apiService.deleteProfilePhoto(command).subscribe((result) => {
      if (result.success) {
        this.images.splice(this.currentImageIndex, 1);
      }

      this.isBusy = false;
    });
  }

  private fetchProfilePhotos() {
    const userId = this.userDataService.getUserId()!;

    this.isBusy = true;
    this.apiService.getProfilePhotos(userId).subscribe((result) => {
      if (result.success) {
        this.images = result.value!;
      }

      this.isBusy = false;
    });
  }

  private async photoEditorHandler(event: NgxCroppedEvent) {
    const file = event.file;

    if (file == null) {
      return;
    }

    const uploadResult = await this.blobService.uploadImage(file);

    if (uploadResult.success === false) {
      this.messageService.add({
        severity: 'error',
        key: 'formMessage',
        summary: 'Error',
        detail: 'Something went wrong, could not upload the image, try again',
      });

      return;
    }

    const photo = uploadResult.value!;
    const userId = this.userDataService.getUserId()!;
    const command: UploadProfilePhotoCommand = {
      userId: userId,
      photoUrl: photo.url,
    };

    this.apiService.uploadProfilePhoto(command).subscribe((result) => {
      if (result.success) {
        const photo = result.value;

        this.images = [...this.images, {
          photoId: photo?.photoId,
          photoUrl: photo?.photoUrl,
        }];
      }
      else {
        this.messageService.add({
          severity: 'error',
          key: 'formMessage',
          summary: 'Error',
          detail: 'Something went wrong, could not upload the image, try again',
        });
      }
    });
  }
}

interface FileUploadEvent {
  files: File[];
}
