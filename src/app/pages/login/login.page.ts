import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../common/auth/service/authentication.service';
import { User } from '../../common/auth/model/user';
import { LoginError } from '../../common/auth/model/login-error';
import { ModalController, ToastController } from '@ionic/angular';
import { ImprintPage } from '../imprint/imprint.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoginInProgress = false;
  hasLoginFailed = false;
  loginError: LoginError;

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((user: User) => {
      if (user !== null) {
        this.router.navigateByUrl('/home').then(didNavigate => {
        });
      }
    });
  }

  submitLoginForm() {
    this.isLoginInProgress = true;
    const values = this.loginForm.value;
    this.auth.login(values.username, values.password).then(wasSuccessful => {
      if (wasSuccessful) {
        this.loginWorked();
      }
    }).catch(error => {
      this.isLoginInProgress = false;
      this.hasLoginFailed = true;
      console.error(error.error);
      this.loginError = error.error;
    });
  }

  async openImprintModal() {
    const modal = await this.modalController.create({
      component: ImprintPage,
    });
    return await modal.present();
  }

  private loginWorked(): void {
    this.isLoginInProgress = false;
    this.hasLoginFailed = false;
    this.toastController.create({
      message: 'Login erfolgreich!',
      duration: 2000
    }).then(toast => {
      toast.present();
    });
  }
}
