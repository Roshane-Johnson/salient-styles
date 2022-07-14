import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './modules/material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { BearerTokenInterceptor } from './interceptors/bearer-token.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileCardComponent } from './components/profile/profile-card/profile-card.component';
import { GradientCardComponent } from './components/gradient-card/gradient-card.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { TitlecasePipe } from './pipes/titlecase.pipe';
import { AdminComponent } from './pages/admin//admin/admin.component';
import { CreateGradientComponent } from './components/admin/create-gradient/create-gradient.component';
import { AuthService } from './services/auth.service';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		FooterComponent,
		LoginComponent,
		HomeComponent,
		SignupComponent,
		ProfileComponent,
		ProfileCardComponent,
		GradientCardComponent,
		ErrorNotFoundComponent,
		TitlecasePipe,
		AdminComponent,
		CreateGradientComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		HttpClientModule,
		ColorPickerModule,
	],
	providers: [
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: BearerTokenInterceptor,
			multi: true,
		},
		AuthService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
