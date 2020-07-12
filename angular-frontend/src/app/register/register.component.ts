import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.createForm();
  }

  ngOnInit() {
    
  }
  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryRegister(value){
    this.authService
    .register(value)
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
        this.router.navigate(['/login']) &&
        this.snackBar.open(
          `Registered successfully. 😊`,
          'Close',
          {
            duration: 4000,
          },
        ),
    );
  }

}
