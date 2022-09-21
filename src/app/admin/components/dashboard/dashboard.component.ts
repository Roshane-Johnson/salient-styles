import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedUtilsService } from 'src/app/services/shared-utils.service';
import { ApiResponse } from 'src/app/types/ApiResponse';
import { Gradient } from 'src/app/types/Gradient';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
	@ViewChildren('gradientElement') gradientElements!: ElementRef[] | any;

	totalGradients: number | undefined;
	totalUsers: number | undefined;

	gradients: Gradient[] = [];

	constructor(private http: HttpClient, private utilService: SharedUtilsService, public dialog: MatDialog) {
		this.http.get<ApiResponse>(`${environment.apiUrl}/gradients/total`).subscribe({
			next: (resp: ApiResponse) => {
				this.totalGradients = resp.data;
			},
			error: (error: HttpErrorResponse) => {
				this.utilService.devlog(error.error);
			},
		});

		this.http.get<ApiResponse>(`${environment.apiUrl}/users/total`).subscribe({
			next: (resp: ApiResponse) => {
				this.totalUsers = resp.data;
			},
			error: (error: HttpErrorResponse) => {
				this.utilService.devlog(error.error);
			},
		});
	}

	openDialog(gradientName: string) {
		const index = this.gradients.findIndex((gradient: Gradient) => gradient.name == gradientName);

		const dialogRef = this.dialog.open(GradientDeleteModal, { data: { gradient: this.gradients[index] } });

		dialogRef.afterClosed().subscribe((result) => {
			if (result == true) {
				this.gradients.splice(index, 1);
			}
		});
	}

	ngOnInit(): void {
		this.http.get<ApiResponse>(`${environment.apiUrl}/gradient/all`).subscribe({
			next: (resp: ApiResponse) => {
				this.gradients = resp.data;
			},
			error: (error: HttpErrorResponse) => {
				this.utilService.devlog(error.error);
			},
		});
	}

	ngAfterViewInit(): void {
		this.gradients.forEach((gradient) => {
			this.gradientElements.forEach((element: ElementRef) => {
				element.nativeElement.style.background = `linear-gradient(${gradient.direction}, ${gradient.colors}) no-repeat`;
			});
		});
	}
}

@Component({
	template: `<h1 mat-dialog-title>Delete gradient?</h1>
		<div mat-dialog-content>Would you like to delete {{ data.gradient.name }}?</div>
		<div mat-dialog-actions>
			<button mat-button mat-dialog-close>No</button>
			<button mat-flat-button mat-dialog-close cdkFocusInitial color="warn" (click)="deleteOne()">Delete</button>
		</div> `,
	selector: '[gradient-delete-modal]',
})
export class GradientDeleteModal implements OnInit {
	constructor(public dialogRef: MatDialogRef<GradientDeleteModal>, @Inject(MAT_DIALOG_DATA) public data: any) {}

	deleteOne() {
		this.dialogRef.close(true);
	}

	ngOnInit(): void {}
}
