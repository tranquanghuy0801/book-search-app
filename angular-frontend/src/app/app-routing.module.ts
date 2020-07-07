import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from '../app/book/book.component';

const routes: Routes = [
	{path: 'library',pathMatch: 'full', component: BookComponent},
	{path: '', redirectTo: 'library',pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
