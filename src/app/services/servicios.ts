import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Servicios } from '../interfaces/servicios';
import { environment } from '../../environments/environment'; 




@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  //hacemos las peticiones

  postServicios(serviciosToCreate : Servicios){
    return this._httpClient.post(this.apiUrl + '/servicios/crear' , serviciosToCreate);
  }

getServicios(){
  return this._httpClient.get(this.apiUrl + '/servicios/mostrar');
}

putServicios(serviciosToUpdate: Servicios,id: string){
  return this._httpClient.put('${this.apiUrl}/servicios/actualizar/${id}' , serviciosToUpdate);
}
deleteServicios(id: string){
  return this._httpClient.delete(this.apiUrl + '/servicios/eliminar/:id',{
    params : {id}
  } );
}




}
