import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedUtilsService } from 'src/app/services/shared-utils.service';
import { LoginResponse } from 'src/app/types/LoginResponse';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private _auth: AuthService,
    private _utils: SharedUtilsService
  ) {}
  isAdmin: boolean = false;

  fetchCompleted: boolean | null = null;
  loginSuccessfull: boolean | null = null;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser(form: FormGroup): void {
    if (form.invalid) return;

    this.fetchCompleted = false;

    let loginCredentials = new FormData();

    loginCredentials.append('email', form.value.email);
    loginCredentials.append('password', form.value.password);

    this._auth.loginUser(loginCredentials).subscribe({
      next: (resp: LoginResponse) => {
        if ('bearer_token' in resp.data) {
          this.fetchCompleted = true;
          this.loginSuccessfull = true;

          localStorage.setItem('token', resp.data.bearer_token);

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2 * 1000);
        } else {
          this.loginSuccessfull = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        this._utils.devlog(error.error);
      },
    });
  }

  ngOnInit(): void {}
}
