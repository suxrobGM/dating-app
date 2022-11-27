import {Injectable} from '@angular/core';
import {Account, Profile} from '@shared/models';
import {ApiService, BlobService} from '@shared/services';
import {lastValueFrom} from 'rxjs';


@Injectable()
export class CreateAccountService {
  private readonly account: Account;
  private mainPhoto: UploadFile | null;

  constructor(
    private apiService: ApiService,
    private blobService: BlobService)
  {
    this.account = {email: ''};
    this.mainPhoto = null;
  }

  setAccountCredentials(email: string, password: string) {
    this.account.email = email;
    this.account.password = password;
  }

  setProfile(profile: Profile) {
    this.account.profile = profile;
  }

  setMainPhoto(image: UploadFile) {
    this.mainPhoto = image;
  }

  getAccount(): Account {
    return this.account;
  }

  getMainPhoto(): UploadFile | null {
    return this.mainPhoto;
  }

  async submitData(): Promise<boolean> {
    const mainPhoto = this.mainPhoto?.file!;
    const uploadResult = await this.blobService.uploadImage(mainPhoto);
    const account = this.account;
    const profile = this.account.profile;

    if (uploadResult.success === false || profile == null) {
      return false;
    }

    profile.mainPhotoUrl = uploadResult.value!.url;

    const command = {
      email: account.email,
      password: account.password!,
      firstName: profile.firstName!,
      lastName: profile.firstName!,
      birthdate: profile.birthdate!,
      livingCity: profile.livingCity!,
      orientation: profile.orientation!,
      gender: profile.gender!,
      mainPhotoUrl: profile.mainPhotoUrl!,
    };

    const result = await lastValueFrom(this.apiService.createAccount(command));

    if (result.success === false) {
      await this.blobService.removeFile(profile.mainPhotoUrl);
      return false;
    }

    console.log(this.account);
    return true;
  }
}

interface UploadFile {
  base64?: string;
  file?: File;
}
