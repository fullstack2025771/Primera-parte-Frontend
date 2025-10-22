import { Component, inject } from '@angular/core';
// formularios reactivos

import { ReactiveFormsModule, FormControl, FormGroup, Validator, FormGroupName } from '@angular/forms';
import { Credencials } from '../../interfaces/credencials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
private _loginService = inject(LoginService);

  loginForm = new FormGroup({
    emailLogin: new FormControl(''),
    passwordLogin: new FormControl('')
  })
  handleSummit() {
    const credencials:Credencials = {
      emailLogin: this.loginForm.value.emailLogin || '',
      passwordLogin: this.loginForm.value.passwordLogin || ''
    }
    console.log('credencials para login', credencials);
  

    this._loginService.Login(credencials).subscribe({
      // manejo de 

      next: (res: any) => {
        console.log(res);
        if (res) {
          localStorage.setItem('token', res.token);
          Swal.fire({
            title: "Drag me!",
            icon: "success",
            draggable: true
          });
          this._loginService.redirectTo();
        }
      },
      error: (err: any) => {
        console.error(err);
      }
      });
    }
}