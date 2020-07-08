import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';

import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { SearchService } from './search.service';
import { firebase } from '../environments/env';

@NgModule({
	declarations: [
		AppComponent,
		BookComponent,
		HeaderComponent,
		SidenavListComponent,
		LoginComponent,
		RegisterComponent,
		UserComponent
	],
	imports: [
		BrowserModule,
		MaterialModule,
		HttpClientModule,
		FlexLayoutModule,
		RouterModule.forRoot(rootRouterConfig, { useHash: false }),
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(firebase),
    	AngularFirestoreModule, // imports firebase/firestore, only needed for database features
   		AngularFireAuthModule // imports firebase/auth, only needed for auth features
	],
	providers: [AuthService, UserService, UserResolver, AuthGuard,SearchService],
	bootstrap: [AppComponent]
})
export class AppModule { }
