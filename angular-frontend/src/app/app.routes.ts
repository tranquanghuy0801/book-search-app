import {
	AngularFireAuthGuard,
	redirectUnauthorizedTo,
  } from '@angular/fire/auth-guard';
import { Routes} from '@angular/router';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['library']);

export const rootRouterConfig: Routes = [
	{ path: 'library', component: BookComponent,data: { authGuardPipe: redirectUnauthorizedToLogin }},
	{ path: '', redirectTo: 'library', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent}
];
