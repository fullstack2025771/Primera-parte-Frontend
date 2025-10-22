import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Credencials } from '../interfaces/credencials';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

//. 1 Inyectar y definir variables
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiUrl = environment.appUrl;

// 2 Desarrollo la logica de los servicio


  Login(loginCredencials: Credencials) {
    return this._httpClient.post(`${this.apiUrl}/login`, loginCredencials);
  }
// 2.2 Decirle al navegador de donde va ha sacar el token
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
  // 2.3 Cierre de sesion
  logout() {
    localStorage.removeItem('token');
    alert('Cierre de sesion, Vuelve pronto'),
      this._router.navigate(['/login'])
  }
   isLoggedIn() {
  return this. getToken() ? true : false;
} // si no hay token , No esta logueado, si lo hay entonces inicie sesion

}
