import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/users';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actual-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './actual-usuario.html',
  styleUrl: './actual-usuario.css'
})
export class ActualUsuario {

  private _userService = inject(UserService);
  private route = inject(ActivatedRoute);
private router = inject(Router);

  id: any;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  userData!: User;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser(this.id);
  }

  
  getUser(id: string) {
    this._userService.getUserById(id).subscribe({
      next: (res: any) => {
        console.log("RESPUESTA COMPLETA:", res);
        console.log("DATA:", res.data);
  
        this.userData = res.data;

        // llenar formulario
        this.registerForm.patchValue({
          name: this.userData.name,
          email: this.userData.email,
          address: this.userData.address,
          telephone: this.userData.telephone,
          password: this.userData.password,
        });
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo cargar el usuario', 'error');
      }
    });
  }

  //  ACTUALIZAR USUARIO
  handleSubmit() {

    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'warning');
      return;
    }

    const updatedUser: User = {
      name: this.registerForm.value.name ?? '',
      email: this.registerForm.value.email ?? '',
      address: this.registerForm.value.address ?? '',
      telephone: this.registerForm.value.telephone ?? '',
      password: this.registerForm.value.password ?? '',
      role: 'user'
    };

    this._userService.putUser(updatedUser, this.id).subscribe({
      next: (res: any) => {
        Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
      }
    });

  }
volver() {
  this.router.navigate(['/dashboard/user']);
}

}




// import { Component, inject } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { User } from '../../../interfaces/user';
// import { UserService } from '../../../services/users';
// import Swal from 'sweetalert2';
// import { ActivatedRoute } from '@angular/router';
// Swal
// @Component({
//   selector: 'app-actual-usuario',
//   imports: [ReactiveFormsModule],
//   templateUrl: './actual-usuario.html',
//   styleUrl: './actual-usuario.css'
// })
// export class ActualUsuario {
// private _userService = inject(UserService); 


