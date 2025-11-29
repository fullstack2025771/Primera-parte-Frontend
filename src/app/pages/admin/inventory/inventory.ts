import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/products';
import { Product } from '../../../interfaces/product';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {
  private _productService = inject(ProductService);
  allProduct: Product[] = [];

  productSelected: Product = {
    

    title: '',
    description: '',
    price: 0,
    category: '',
    image: ''
  };

 ngOnInit(): void {
    this.showProduct();
  }


  showProduct() {
this._productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.allProduct = res.data;
      },
      error: (err: any) => console.error(err)
    });
  }
    
saveProduct() {
  console.log(this.productSelected)
    // Si tiene ID → actualizar
    this._productService.postProduct(this.productSelected).subscribe({
        next: (res: any) => {
          console.log(this.productSelected)
          Swal.fire('Creado', res.mensaje || 'Producto creado con éxito', 'success');
          this.resetForm();
          this.showProduct();
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo crear el producto', 'error');
        }
      });
  }
 
updateProductInfo(id: any){
   this._productService.putProducts(this.productSelected, id).subscribe({
    next:(res: any)=> {
     console.log(res)
    },
    error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
        }
   })

}

deleteProduct(id: string) {
    this._productService.deleteProduct(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Producto eliminado',
          text: res.mensaje,
          icon: "success"
        }).then(() => this.showProduct());
      },
      error: (err: any) => console.error(err)
    });
  }
resetForm() {
    this.productSelected = {
      
      title: '',
      description: '',
      price: 0,
      category: '',
      image: ''
    };
  }
}

