import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {MessageService} from 'primeng/api';
import {FileUpload} from 'primeng/fileupload';
import {NgxPhotoEditorService, Options} from 'ngx-photo-editor';
import {CreateAccountService} from '@modules/account/shared';


@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss'],
})
export class PhotoFormComponent implements OnInit {
  private readonly photoEditorOptions: Options;
  public readonly form: FormGroup;
  public croppedImage: string | null;
  public isBusy: boolean;

  @ViewChild('fileUploader') fileUploader!: FileUpload;

  constructor(
    private createAccountService: CreateAccountService,
    private oidcService: OidcSecurityService,
    private photoEditor: NgxPhotoEditorService,
    private messageService: MessageService,
    private router: Router)
  {
    this.photoEditorOptions = {
      autoCropArea: 1,
      imageQuality: 90,
      format: 'jpeg',
      resizeToHeight: 1080,
      viewMode: 1,
    };

    this.form = new FormGroup({
      profilePhoto: new FormControl(''),
    });

    this.isBusy = false;
    this.croppedImage = null;
  }

  ngOnInit(): void {
    this.croppedImage = this.createAccountService.getMainPhoto()?.base64 ?? null;
  }

  imageUploadHandler(event: FileUploadEvent) {
    const imageFile = event.files[0];

    this.photoEditor.open(imageFile, this.photoEditorOptions)
        .subscribe(({base64, file}) => {
          if (!base64 || !file) {
            return;
          }

          this.createAccountService.setMainPhoto({base64, file});
          this.croppedImage = base64;
        });

    this.fileUploader.clear();
  }

  prevPage() {
    this.router.navigateByUrl('/account/create/profile-form');
  }

  async submit() {
    if (this.croppedImage == null) {
      this.messageService.add({
        severity: 'error',
        key: 'formMessage',
        summary: 'Error',
        detail: 'Please upload photo',
      });
      return;
    }

    this.isBusy = true;
    const createdAccount = await this.createAccountService.submitData();

    if (createdAccount) {
      this.messageService.add({
        severity: 'success',
        key: 'formMessage',
        detail: 'Successfully created an account, you will be redirected to login page',
      });

      this.oidcService.authorize();
    }
    else {
      this.messageService.add({
        severity: 'error',
        key: 'formMessage',
        summary: 'Error',
        detail: 'Could not create an account',
      });

      this.isBusy = false;
    }
  }
}

interface FileUploadEvent {
  files: File[];
}
