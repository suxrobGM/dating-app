import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {ApiService} from '@shared/services';


@Component({
  selector: 'app-security-tab',
  templateUrl: './security-tab.component.html',
  styleUrls: ['./security-tab.component.scss'],
})
export class SecurityTabComponent implements OnInit {
  private readonly passwordRegex: RegExp;
  public readonly passwordPattern: string;
  public readonly form: FormGroup;

  constructor(private apiService: ApiService) {
    this.passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@^!%*?&#])(?=.{8,})';
    this.passwordRegex = new RegExp(this.passwordPattern);

    this.form = new FormGroup({
      email: new FormControl('', {
        validators: Validators.compose([Validators.required, Validators.email, this.checkEmail.bind(this)]),
        updateOn: 'blur',
      }),
      oldPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    },
    {
      validators: this.matchPasswords.bind(this),
    });
  }

  ngOnInit(): void {
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.form.get(controlName);
    return control && control.getError(errorType);
  }

  submit() {

  }

  private checkEmail(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    if (!email.includes('@')) {
      return null;
    }

    this.apiService.userExists(email)
        .subscribe((res) => {
          if (res.success && res.value) {
            this.form.get('email')?.setErrors({emailExists: true});
          }
        });

    return null;
  }

  private matchPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value; // get password from our password form control
    const confirmPassword = control.get('confirmPassword')?.value; // get password from our confirmPassword form control

    if (!this.passwordRegex.test(password)) {
      control.get('password')?.setErrors({passwordIncorrect: true});
      return {passwordIncorrect: true};
    }

    if (password != null && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({passwordMismatch: true});
      return {passwordMismatch: true};
    }
    return null;
  }
}
