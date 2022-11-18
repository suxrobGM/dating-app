import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CreateAccountService} from '@modules/account/shared';


@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent implements OnInit {
  private readonly passwordRegex: RegExp;
  public readonly passwordPattern: string;
  public readonly form: FormGroup;

  constructor(
    private createAccountService: CreateAccountService,
    private router: Router)
  {
    this.passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@^!%*?&#])(?=.{8,})';
    this.passwordRegex = new RegExp(this.passwordPattern);

    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    },
    {
      validators: this.matchPasswords.bind(this),
    });
  }

  ngOnInit(): void {
    const account = this.createAccountService.getAccount();
    this.form.patchValue({email: account.email});
  }

  nextPage() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;

    this.createAccountService.setAccountCredentials(email, password);
    this.router.navigateByUrl('/account/create/profile-form');
  }

  emailRequired(): boolean {
    const emailControl = this.form.get('email');
    return emailControl && emailControl.getError('required');
  }

  passwordIncorrect(): boolean {
    const passwordControl = this.form.get('password');
    return passwordControl && passwordControl.getError('passwordIncorrect');
  }

  passwordMismatch(): boolean {
    const confirmPasswordControl = this.form.get('confirmPassword');
    return confirmPasswordControl && confirmPasswordControl.getError('passwordMismatch');
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
