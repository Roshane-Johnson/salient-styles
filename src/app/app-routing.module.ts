import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EditComponent } from './components/profile/edit/edit.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
	},
	// {
	// 	path: 'login',
	// 	component: LoginComponent,
	// },
	// { path: 'signup', component: SignupComponent },
	// {
	// 	path: 'profile',
	// 	component: ProfileComponent,
	// 	canActivate: [AuthGuard],
	// 	children: [
	// 		{
	// 			path: 'edit',
	// 			component: EditComponent,
	// 		},
	// 		{
	// 			path: ':username',
	// 			component: ProfileComponent,
	// 		},
	// 	],
	// },
	{
		path: 'admin',
		// canActivate: [AdminGuard],
		loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
	},
	{ path: 'not-found', component: ErrorNotFoundComponent },
	{ path: '**', redirectTo: 'not-found' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
