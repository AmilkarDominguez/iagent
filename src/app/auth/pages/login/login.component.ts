import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['agente1@gmail.com', [Validators.required, Validators.email]],
    password: ['Abecedeefge123', [Validators.required, Validators.minLength(8)]],
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }


  login() {

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .subscribe(resp => {
        if (resp === true) {
          this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: email });
          this.router.navigateByUrl('');
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Los datos son incorrectos, ' + resp });
        }
      });
  }
  goRegister() {
    this.router.navigateByUrl('/auth/register');
  }

}
