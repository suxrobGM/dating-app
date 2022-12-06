import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgxCroppedEvent, NgxPhotoEditorService, Options} from 'ngx-photo-editor';
import {MessageService} from 'primeng/api';
import {FileUpload} from 'primeng/fileupload';
import {ApiService, BlobService, UserDataService} from '@shared/services';
import {ProfilePhoto} from '@shared/models';
import {
  DeleteProfilePhotoCommand,
  SetProfileMainPhotoCommand,
  UploadProfilePhotoCommand,
} from '@shared/models/commands';


@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PhotosTabComponent implements OnInit {
  private readonly photoEditorOptions: Options;
  public currentImageIndex: number;
  public images: ProfilePhoto[];
  public isBusy: boolean;

  @ViewChild('fileUploader') fileUploader!: FileUpload;

  constructor(
    private apiService: ApiService,
    private blobService: BlobService,
    private userDataService: UserDataService,
    private photoEditor: NgxPhotoEditorService,
    private messageService: MessageService)
  {
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
  }

  ngOnInit(): void {
    this.fetchProfilePhotos();
  }

  getCurrentImage(): ProfilePhoto {
    return this.images[this.currentImageIndex];
  }

  changeSelectedImage(event: number) {
    this.currentImageIndex = event;
  }

  canUploadPhoto(): boolean {
    return this.images.length <= 10;
  }

  canDeletePhoto(): boolean {
    return this.images.length > 1;
  }

  canSetMainPhoto(): boolean {
    const selectedImage = this.images[this.currentImageIndex];
    return selectedImage?.isMainPhoto === false;
  }

  uploadImage(event: FileUploadEvent) {
    const imageFile = event.files[0];

    this.photoEditor.open(imageFile, this.photoEditorOptions)
        .subscribe(this.photoEditorHandler.bind(this));

    this.fileUploader.clear();
  }

  setMainPhoto() {
    const selectedImage = this.images[this.currentImageIndex];
    const userId = this.userDataService.getUserId();
    this.isBusy = true;

    const command: SetProfileMainPhotoCommand = {
      userId: userId!,
      photoId: selectedImage.photoId!,
    };

    this.apiService.setProfileMainPhoto(command).subscribe((result) => {
      if (result.success) {
        this.bringMainPhotoToTop(selectedImage);

        this.messageService.add({
          severity: 'success',
          key: 'formMessage',
          summary: 'Success',
          detail: 'Changed the profile main picture',
        });
      }

      this.isBusy = false;
    });
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
        this.currentImageIndex = 0;

        this.messageService.add({
          severity: 'success',
          key: 'formMessage',
          summary: 'Success',
          detail: 'Deleted the selected picture from profile',
        });
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
        this.bringMainPhotoToTop();
      }

      this.isBusy = false;
    });
  }

  private async photoEditorHandler(event: NgxCroppedEvent) {
    const file = event.file;

    if (file == null) {
      return;
    }

    this.isBusy = true;
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
        const photo = result.value!;
        this.insertNewPhoto(photo);

        this.messageService.add({
          severity: 'success',
          key: 'formMessage',
          summary: 'Success',
          detail: 'Uploaded a new profile picture',
        });
      }
      else {
        this.messageService.add({
          severity: 'error',
          key: 'formMessage',
          summary: 'Error',
          detail: 'Something went wrong, could not upload the image, try again',
        });
      }

      this.isBusy = false;
    });
  }

  private bringMainPhotoToTop(mainPhoto?: ProfilePhoto) {
    let mainPhotoIndex = 0;

    if (!mainPhoto) {
      mainPhotoIndex = this.images.findIndex((i) => i.isMainPhoto);
      mainPhoto = this.images[mainPhotoIndex];
    }
    else {
      mainPhotoIndex = this.images.findIndex((i) => i.photoId === mainPhoto?.photoId);
      mainPhoto.isMainPhoto = true;
    }

    this.images.splice(mainPhotoIndex, 1);
    this.images.unshift(mainPhoto);

    for (let i = 1; i < this.images.length; i++) {
      const image = this.images[i];
      image.isMainPhoto = false;
    }

    this.currentImageIndex = 0;
  }

  private insertNewPhoto(photo: ProfilePhoto) {
    this.images = [...this.images, photo];
    this.currentImageIndex = this.images.length - 1;
  }
}

interface FileUploadEvent {
  files: File[];
}
