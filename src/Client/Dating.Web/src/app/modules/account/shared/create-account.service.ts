import {Injectable} from '@angular/core';
import {Account, Profile} from '@shared/models';
import {ApiService, BlobService} from '@shared/services';

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

  async submitData() {
    const mainPhoto = this.mainPhoto?.file!;
    const result = await this.blobService.uploadFile(mainPhoto);

    console.log(result);

    if (result.success) {
      this.account.profile!.mainPhotoUrl = result.value?.url;
      console.log(this.account);
    }
  }
}

interface UploadFile {
  base64?: string;
  file?: File;
}
