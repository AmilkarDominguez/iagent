import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: ['NameTest', [Validators.required, Validators.minLength(3)]],
    lastname: ['lastnameTest', [Validators.required, Validators.minLength(3)]],
    phone_number: ['12345678', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
    email: ['agente1@gmail.com', [Validators.required, Validators.email]],
    password: ['Abecedeefge123', [Validators.required, Validators.minLength(8)]],
    rol: ['AGENT', [Validators.required]],

  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }


  register() {

    const {
      name,
      lastname,
      phone_number,
      email,
      password,
      rol
    } = this.registerForm.value;

    this.authService.register(name,
      lastname,
      phone_number,
      email,
      password,
      rol)
      .subscribe(resp => {
        if (resp === true) {
          this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: email });
          this.router.navigateByUrl('');
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al registrarse, '+resp });
        }
      });
  }
  goLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  fiedlIsValid(field: string) {
    return this.registerForm.controls[field].errors
      && this.registerForm.controls[field].touched;
  }

}
