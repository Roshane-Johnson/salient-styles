import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	imports: [
		CommonModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatDividerModule,
		MatCheckboxModule,
		MatIconModule,
		MatMenuModule,
		MatTabsModule,
		MatSnackBarModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatSelectModule,
		MatPaginatorModule,
		MatBadgeModule,
		MatDialogModule,
	],
	exports: [
		CommonModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatDividerModule,
		MatCheckboxModule,
		MatIconModule,
		MatMenuModule,
		MatTabsModule,
		MatSnackBarModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatSelectModule,
		MatPaginatorModule,
		MatBadgeModule,
		MatDialogModule,
	],
})
export class MaterialModule {}
