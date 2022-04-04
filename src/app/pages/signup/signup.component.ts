import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/helpers';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterResponse } from 'src/app/types/RegisterResponse';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private _auth: AuthService, private router: Router) {}

  validate = new Utilities();

  fetchCompleted: boolean | null = null;
  signupSuccessfull: boolean | null = null;

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  createUser(form: FormGroup): void {
    if (form.invalid) return;
    this.fetchCompleted = false;

    let signupCredentials = new FormData();
    signupCredentials.append('first_name', form.value.firstName);
    signupCredentials.append('last_name', form.value.lastName);
    signupCredentials.append('username', form.value.username);
    signupCredentials.append('email', form.value.email);
    signupCredentials.append('password', form.value.password);
    signupCredentials.append(
      'password_confirmation',
      form.value.confirmPassword
    );
    this._auth
      .registerUser(signupCredentials)
      .subscribe((resp: RegisterResponse) => {
        console.log(resp);
        if ('bearer_token' in resp.data) {
          this.fetchCompleted = true;
          this.signupSuccessfull = true;

          localStorage.setItem('token', resp.data.bearer_token);

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2 * 1000);
        } else {
          this.signupSuccessfull = false;
        }
      });
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  ngOnInit(): void {}
}
