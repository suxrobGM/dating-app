import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {UpdateAccountCommand, User} from '@shared/models';
import {ApiService, UserDataService} from '@shared/services';


@Component({
  selector: 'app-security-tab',
  templateUrl: './security-tab.component.html',
  styleUrls: ['./security-tab.component.scss'],
})
export class SecurityTabComponent implements OnInit {
  private readonly passwordRegex: RegExp;
  public readonly passwordPattern: string;
  public readonly form: FormGroup;
  public isBusy: boolean;
  private user!: User;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private userDataService: UserDataService)
  {
    this.passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@^!%*?&#])(?=.{8,})';
    this.passwordRegex = new RegExp(this.passwordPattern);
    this.isBusy = false;

    this.form = new FormGroup({
      email: new FormControl('', {
        validators: Validators.compose([Validators.email, this.checkEmail.bind(this)]),
        updateOn: 'blur',
      }),
      oldPassword: new FormControl('', Validators.minLength(8)),
      password: new FormControl('', Validators.minLength(8)),
      confirmPassword: new FormControl('', Validators.minLength(8)),
    },
    {
      validators: this.matchPasswords.bind(this),
    });
  }

  ngOnInit(): void {
    this.user = this.userDataService.getUser()!;

    this.form.patchValue({
      email: this.user.email,
    });
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.form.get(controlName);
    return control && control.getError(errorType);
  }

  submit() {
    const form = this.form.value;
    const userId = this.user.id;

    const command: UpdateAccountCommand = {
      id: userId,
      email: form.email,
      oldPassword: form.oldPassword,
      newPassword: form.password,
    };

    this.isBusy = true;

    this.apiService.updateAccount(command).subscribe((result) => {
      if (result.success) {
        this.messageService.add({
          severity: 'success',
          key: 'formMessage',
          summary: 'Success',
          detail: 'Profile data has been updated successfully',
        });

        if (command.email) {
          this.user.email = command.email;
          this.userDataService.updateUser(this.user);
        }
      }
      else {
        this.messageService.add({
          severity: 'error',
          key: 'formMessage',
          summary: 'Error',
          detail: 'Could not update the profile data',
        });
      }

      this.isBusy = false;
    });
  }

  private checkEmail(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;
    const currentEmail = this.userDataService.getUser()?.email;

    if (!email.includes('@') || currentEmail === email) {
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
    const oldPassword = control.get('oldPassword');
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && oldPassword === null) {
      control.get('oldPassword')?.setErrors({passwordNotSet: true});
      return {passwordNotSet: true};
    }

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
