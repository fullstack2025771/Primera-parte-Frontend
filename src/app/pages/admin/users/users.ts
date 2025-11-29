import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/users';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-users',
    imports: [RouterLink],
    templateUrl: './users.html',
    styleUrls: ['./users.css']
})
// Inyeccion de dependencias y inicilizacion de variables
export class UserComponent implements OnInit {
    private _userService = inject(UserService);
    allUsers: User[] = [];

    showUsers() {
        this._userService.getUser().subscribe({
            next: (res: any) => {
                console.log(res);
                this.allUsers = res.data
                console.log(this.allUsers);
            },
            error: (err: any) => {
                console.error(err.mensaje)
            }
        });
    }
      // Se toma como ref el registro de usuarios
    deleteUser(id: string) {     // hace la peticion delete 

        console.log('Id del usuario a  eliminar: ', id)
        this._userService.deleteUser(id).subscribe({
            next: (res: any) => {
                console.log(res);
                Swal.fire({
                    title: 'Usuario eliminado',
                    text: res.mensaje,
                    icon: "success"
                }).then(() => {
                    this.showUsers();
                })
            },
            error: (err: any) => {
                console.error(err)
            }
        });

    }

    selectedUser: User | null = null;
    updateUsersInfo(id: string) {
        // encuentra el usuario para editat
        const user = this.allUsers.find(u => u._id === id);

        if (user) {
            this.selectedUser = { ...user };
        }
    }

    cancelEdit() {
        this.selectedUser = null;
    }
    updateUser() {
        if (!this.selectedUser || !this.selectedUser._id) return;
        this._userService.putUser(this.selectedUser, this.selectedUser._id).subscribe({
            next: (res: any) => {
                Swal.fire('Actualizado', res.mensaje || 'Usuario Actualizado');
                this.selectedUser = null;

            },
            error: (err: any) => console.error()
        });


    }
    ngOnInit(): void {
        this.showUsers();
    }
}
