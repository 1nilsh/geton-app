import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../common/auth/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoginInProgress = false;
  hasLoginFailed = false;

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.auth.getUser() !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  submitLoginForm() {
    this.isLoginInProgress = true;
    const values = this.loginForm.value;
    this.auth.login(values.username, values.password).then(wasSuccessful => {
      if (wasSuccessful) {
        this.loginWorked();
      } else {
        this.isLoginInProgress = false;
        this.hasLoginFailed = true;
      }
    });
  }

  private loginWorked(): void {
    this.isLoginInProgress = false;
    this.hasLoginFailed = false;
    this.router.navigateByUrl('/home');
  }
}
