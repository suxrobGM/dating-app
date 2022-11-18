import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FileUpload} from 'primeng/fileupload';
import {NgxPhotoEditorService, Options} from 'ngx-photo-editor';


@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss'],
})
export class PhotoFormComponent implements OnInit {
  private readonly photoEditorOptions: Options;
  public readonly form: FormGroup;
  public croppedImage?: string;

  @ViewChild('fileUploader') fileUploader!: FileUpload;

  constructor(
    private photoEditor: NgxPhotoEditorService,
    private router: Router) {
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
  }

  ngOnInit(): void {
  }

  imageUploadHandler(event: FileUploadEvent) {
    const imageFile = event.files[0];

    this.photoEditor.open(imageFile, this.photoEditorOptions)
        .subscribe(({base64}) => this.croppedImage = base64);

    this.fileUploader.clear();
  }

  prevPage() {
    this.router.navigateByUrl('/account/create/profile-form');
  }

  submit() {

  }
}

interface FileUploadEvent {
  files: File[],
}
