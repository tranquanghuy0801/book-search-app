import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';


@NgModule({
	declarations: [
		AppComponent,
		BookComponent,
		HeaderComponent,
		SidenavListComponent
	],
	imports: [
		BrowserModule,
		MaterialModule,
		AppRoutingModule,
		HttpClientModule,
		FlexLayoutModule,
		BrowserAnimationsModule
	],
	entryComponents: [
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
