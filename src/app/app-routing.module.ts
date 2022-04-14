import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGradientComponent } from './components/admin/create-gradient/create-gradient.component';
import { EditGradientComponent } from './components/admin/edit-gradient/edit-gradient.component';
import { AuthGuard } from './guards/auth.guard';
import { ResolveResolver } from './guards/resolve.resolver';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminComponent } from './pages/admin/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/create', component: CreateGradientComponent },
      { path: 'dashboard/edit', component: EditGradientComponent },
    ],
  },

  { path: 'not-found', component: ErrorNotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
