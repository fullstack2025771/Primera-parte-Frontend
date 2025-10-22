import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validator, } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/users';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private _userService = inject(UserService);
  private _route = inject(Router)


  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    telephone: new FormControl(''),
    password: new FormControl(''),

  });
  handleSubmit() {
    const userData: User = {
      _id: '',
      name: this.registerForm.value.name || '',
      email: this.registerForm.value.email || '',
      address: this.registerForm.value.address || '',
      telephone: this.registerForm.value.telephone || '' ,
      password: this.registerForm.value.password || '',
      role: "user"
    }

    console.log("Datos del Usuario: ", userData);

    this._userService.postUser(userData).subscribe({
      next: (res: any) => {
        
        Swal.fire({
          title: "Bien!",
          text: res.mensaje,
          icon: "success"
        }).then(() => {
          this._route.navigate(['/login']);
        })
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
        Swal.fire({
          title: "Oops",
          text: err.error.mensaje,
          icon: "error"

        })
      }
    })
  }


}
