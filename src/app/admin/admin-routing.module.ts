import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGradientComponent } from './components/create-gradient/create-gradient.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditGradientComponent } from './components/edit-gradient/edit-gradient.component';
import { AdminComponent } from './admin.component';

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
