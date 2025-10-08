import { Injectable, inject,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private_httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';




postUser(userToCreate : User) {
   return this.private_httpClient.post('${this.apiUrl}/users' , userToCreate)
}

getUser(){
  return this.private_httpClient.get('${this.apiUrl}/users');
}



putUser(userToUpdate: User , id:string){
   return this.private_httpClient.put('${this.apiUrl}/users/${id}',userToUpdate);
}


// Metodo delete

deleteUser(id:string){
  return this.private_httpClient.delete('{$this.apiUrl}/users/${id}')
}



}
