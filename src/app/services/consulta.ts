import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class Consulta {
  private _http = inject(HttpClient);
  private apiUrl = environment.appUrl;
  crearConsulta(data: any) {
    return this._http.post(`${this.apiUrl}/consulta/crear`, data);
    
  }
}
