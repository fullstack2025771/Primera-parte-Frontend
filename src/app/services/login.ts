import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { credencials } from '../interfaces/credencials';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiUrl = environment.appUrl;




  Login(loginCredencials: credencials) {
    return this._httpClient.post(`${this.apiUrl}/login`, loginCredencials);
  }

  getToken() {
    // viene del localStorage -> almacenamiento temporal
    return localStorage.getItem('token'); //obtenemos el token del navegador
  }
  isAdmin() {
    // primero necesito obtener el token, decodifiquelo
    const token = this.getToken();
    // en caso de que si alla token, decodifiquelo
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.admin === true ? true : false;
    } else {
      console.log('No se encontro token');
      return false;
    }
  }

  // 2.4 redireccion una vez que ya inicio sesion
  redirectTo() {


    // si es admin, que redireccione a /admin
    if (this.isAdmin()) {
      this._router.navigate(['/admin']);

    } else {
      this._router.navigate(['/']);


    }

  }
  logout() {
    localStorage.removeItem('token');
    alert('Cierre de sesion, Vuelve pronto'),
      this._router.navigate(['/login'])
  }


}
