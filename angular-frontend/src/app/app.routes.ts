import { Routes} from '@angular/router';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';

export const rootRouterConfig: Routes = [
	{ path: 'library', component: BookComponent},
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
	{ path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
];
