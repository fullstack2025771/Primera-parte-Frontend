import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Citas {
   private _http = inject(HttpClient);
  private apiUrl = environment.appUrl;

  crearCita(data: any) {
    return this._http.post(`${this.apiUrl}/citas/crear`, data);
  }

  // crearConsulta(data: any) {
  //   return this._http.post(`${this.apiUrl}/consultas/crear`, data);
  // }
}
