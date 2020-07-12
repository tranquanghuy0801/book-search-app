import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, take } from 'rxjs/operators';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	@Output() public sidenavToggle = new EventEmitter();
	user$: Observable<firebase.User> = this.authService.user$;

	constructor(
		public authService: AuthService,
		private router: Router,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
	}

	logout() {
		this.authService
			.logout()
			.pipe(take(1))
			.subscribe((response) => {
				this.router.navigate([`/`]);
				this.snackBar.open('Come back soon with our books! 📕', 'Close', {
					duration: 4000,
				});
			});
	}

	public onToggleSidenav = () => {
		this.sidenavToggle.emit();
	}

}
