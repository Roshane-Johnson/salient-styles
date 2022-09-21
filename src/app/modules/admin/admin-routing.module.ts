import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGradientComponent } from 'src/app/components/admin/create-gradient/create-gradient.component';
import { DashboardComponent } from 'src/app/components/admin/dashboard/dashboard.component';
import { EditGradientComponent } from 'src/app/components/admin/edit-gradient/edit-gradient.component';
import { AdminComponent } from 'src/app/pages/admin/admin/admin.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'create', component: CreateGradientComponent },
			{ path: 'edit', component: EditGradientComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
