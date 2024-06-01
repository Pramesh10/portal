import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserloginService } from '../../auth-services/userlogin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers : [UserloginService]
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  /**
   *
   */
  router = inject(Router);
  userLoginServices = inject(UserloginService);

 

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password } = this.form;
    console.log(this.form);
    console.log('loginclicked');

    this.router.navigateByUrl('/dashboard');

  }

  loginWithBiometrics() {
    this.router.navigateByUrl('/dashboard');

    console.log("loginwithBiometrics");
    // this.userLoginServices.performBiometricVerificatin();
      
  }
}
