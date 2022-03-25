import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utilities } from 'src/app/helpers';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  validate = new Utilities();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  loginUser(form: FormGroup): void {
    if (form.invalid) return;
    console.log(form.value);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}
}
