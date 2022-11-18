import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent implements OnInit {
  public readonly passwordPattern: string;
  public readonly form: FormGroup;

  constructor(private router: Router) {
    this.passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';

    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.pattern(this.passwordPattern), Validators.required])),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  nextPage() {
    // if (!this.form.valid) {
    //   return;
    // }

    const password = this.form.value.password;
    const confirmPassword = this.form.value.confirmPassword;

    if (password !== confirmPassword) {
      console.error('Password is not match');
      return;
    }

    this.router.navigateByUrl('/account/create/profile-form');
  }
}
