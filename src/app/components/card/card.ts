import { Component, inject, OnInit } from '@angular/core';

//importo para hacer get de los productos

import { ProductService } from '../../services/products';
import { Product } from '../../interfaces/product';



@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit {

  // inyectamos las dependencias declaramos variables
  _productService = inject(ProductService);

  allProducts: Product[] = [];

  showProducts() {
    // Se hace la peticion get se guarda en la variable para mostrar en el navegador

    this._productService.getAllProducts().subscribe({

      //se manejaan los errores ,esto lo gestiona el backend
      next: (response: any) => {
        this.allProducts = response.data;
        console.log(this.allProducts)
      },
      error: (error: any) => {
        console.error(error);
      }

    })

  }
  // se ejecuta la accion en el navegador
  ngOnInit(): void {
    this.showProducts();
  }

}


















