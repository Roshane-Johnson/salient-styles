import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../modules/material.module';
import {
	DashboardComponent,
	GradientDeleteModal,
} from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { CreateGradientComponent } from './components/create-gradient/create-gradient.component';
import { EditGradientComponent } from './components/edit-gradient/edit-gradient.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
	declarations: [
		DashboardComponent,
		GradientDeleteModal,
		AdminComponent,
		CreateGradientComponent,
		EditGradientComponent,
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		ColorPickerModule,
	],
})
export class AdminModule {}
