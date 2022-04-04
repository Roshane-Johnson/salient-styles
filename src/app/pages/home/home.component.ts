import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  gradients: any[] = [];

  ngOnInit(): void {
    this.http
      .get<ApiResponse>(`${environment.apiUrl}/gradient/all`)
      .subscribe((resp: ApiResponse) => {
        this.gradients = resp.data;
      });
  }
}
