import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryTwitterLogin() {
    this.authService
      .loginViaTwitter()
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      )
      .subscribe(
        (response) =>
          response &&
          this.router.navigate(['/library']) &&
          this.snackBar.open(
            `Welcome to our library. 😊`,
            'Close',
            {
              duration: 4000,
            },
          ),
      );
  }

  tryFacebookLogin() {
    this.authService
      .loginViaFacebook()
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      )
      .subscribe(
        (response) =>
          response &&
          this.router.navigate(['/library']) &&
          this.snackBar.open(
            `Welcome to our library. 😊`,
            'Close',
            {
              duration: 4000,
            },
          ),
      );
  }

  tryGoogleLogin() {
    this.authService
      .loginViaGoogle()
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      )
      .subscribe(
        (response) =>
          response &&
          this.router.navigate(['/library']) &&
          this.snackBar.open(
            `Welcome to our library. 😊`,
            'Close',
            {
              duration: 4000,
            },
          ),
      );
  }

  tryLogin(value){
    this.authService
      .login(value)
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      )
      .subscribe(
        (response) =>
          response &&
          this.router.navigate(['/library']) &&
          this.snackBar.open(
            `Welcome to our library. 😊`,
            'Close',
            {
              duration: 4000,
            },
          ),
      );
  }

}
