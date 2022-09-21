import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent, GradientDeleteModal } from 'src/app/components/admin/dashboard/dashboard.component';

@NgModule({
	declarations: [DashboardComponent, GradientDeleteModal],
	imports: [CommonModule, AdminRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
