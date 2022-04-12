import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-gradient',
  templateUrl: './create-gradient.component.html',
  styleUrls: ['./create-gradient.component.scss'],
})
export class CreateGradientComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const gradientAdminPreview = document.querySelector(
      '#gradientAdminPreview'
    ) as HTMLElement;

    gradientAdminPreview.style.background = `linear-gradient(${this.preview.direction}, ${this.preview.color1}, ${this.preview.color2}, ${this.preview.color3})`;

    this.createGradientForm.valueChanges.subscribe((change: any) => {
      console.log(change);
      gradientAdminPreview.style.background = `linear-gradient(${change.direction}, ${change.color1}, ${change.color2}, ${change.color3})`;
    });
  }

  colorPicker1: string = '#86efac';
  colorPicker2: string = '#3b82f6';
  colorPicker3: string = '#9333ea';
  errorRespMessage: string = '';
  successRespMessage: string = '';

  preview = {
    direction: 'to right',
    color1: this.colorPicker1,
    color2: this.colorPicker2,
    color3: this.colorPicker3,
  };

  _updateColor(color: string, colorNumber: number) {
    eval(`
    console.log(this.color${colorNumber});
    if (this.color${colorNumber} != undefined) {
      this.color${colorNumber}.setValue('${color}');
    }`);
  }

  createGradientForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color1: new FormControl('#86efac', [Validators.required]),
    color2: new FormControl('#3b82f6', [Validators.required]),
    color3: new FormControl('#9333ea', [Validators.required]),
    direction: new FormControl('to right', [Validators.required]),
  });

  get name() {
    return this.createGradientForm.get('name');
  }
  get color1() {
    return this.createGradientForm.get('color1');
  }
  get color2() {
    return this.createGradientForm.get('color2');
  }
  get color3() {
    return this.createGradientForm.get('color3');
  }
  get direction() {
    return this.createGradientForm.get('direction');
  }

  set name(value) {
    this.createGradientForm.controls['name'].setValue(value);
  }
  set color1(value) {
    this.createGradientForm.controls['color1'].setValue(value);
  }
  set color2(value) {
    this.createGradientForm.controls['color2'].setValue(value);
  }
  set color3(value) {
    this.createGradientForm.controls['color3'].setValue(value);
  }
  set direction(value) {
    this.createGradientForm.controls['direction'].setValue(value);
  }

  createGradient(createGradientForm: FormGroup): void {
    let { name, color1, color2, color3, direction } = createGradientForm.value;

    const postBody = new FormData();
    postBody.set('name', name);
    postBody.set('colors', `${color1},${color2},${color3}`);
    postBody.set('direction', direction);

    if (createGradientForm.valid) {
      this.http
        .post<ApiResponse>(`${environment.apiUrl}/gradient/create`, postBody)
        .subscribe({
          next: (resp: ApiResponse) => {
            this.successRespMessage = resp.message;
          },
          error: (err: HttpErrorResponse) => {
            this.errorRespMessage = err.error.message;
          },
          complete: () => {
            this.createGradientForm.reset();
            this.createGradientForm.markAsUntouched();
            this.createGradientForm.markAsPristine();
          },
        });
    } else {
      this.errorRespMessage = 'Ensure all form fields are valid';
    }
  }
}
