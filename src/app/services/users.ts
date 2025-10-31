import { Injectable, inject, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;




  postUser(userToCreate: User) {
    return this._httpClient.post(`${this.apiUrl}/users/crear`, userToCreate)
  }




  
  getUser() {
    return this._httpClient.get(`${this.apiUrl}/users/mostrar`);
  }



  putUser(userToUpdate: User, id: string) {
    return this._httpClient.put(`${this.apiUrl}/users/actualizar/${id}`, userToUpdate);
  }


  // Metodo delete

  deleteUser(id: string) {
    return this._httpClient.delete(`${this.apiUrl}/users/eliminar/${id}`)
  }



}
