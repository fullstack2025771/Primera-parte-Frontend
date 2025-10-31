// los servicios son logica accesible desde cualquier parte de un proyecto

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // para usar post get, put,delete
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // 1. Inyeccion de dependencias y/o directivas de angular
  private _httpClient = inject(HttpClient);
  //.2 . Definir la ruta de acceso al backend
  private apiUrl = environment.appUrl;

  // 3. Met{odos para  lograr peticiones

  postProduct(productToCreate: Product) {
    return this._httpClient.post(this.apiUrl + '/products/crear', productToCreate);

  };

getAllProducts() {
    return this._httpClient.get(this.apiUrl + '/products/mostrar');

  }

  // Peticion post


// peticion put 

putProducts(productToUpdate: Product, id: string) {
  //   return this._httpClient.put(this.apiUrl +'products/actualizar/' + id,
  //  productToUpdate);


  return this._httpClient.put(`${this.apiUrl}/products/actualizar/${id}`, productToUpdate);
};


// peticion delete
deleteProduct(id: string){
  //return this._httpClient.delete(this.apiUrl + id)
  return this._httpClient.delete(this.apiUrl + '/products/eliminar/:id', {
    params: { id }
  });
};








}
