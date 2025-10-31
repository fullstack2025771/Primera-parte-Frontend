import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/products';
import { Product } from '../../../interfaces/product';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {
  private _productService = inject(ProductService);
  allProduct: Product[] = [];

  productSelected: Product = {
    _id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    Image: ''
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
    // Si tiene ID → actualizar
    if (this.productSelected._id) {
      this._productService.putProducts(this.productSelected, this.productSelected._id).subscribe({
        next: (res: any) => {
          Swal.fire('Actualizado', res.mensaje || 'Producto actualizado con éxito', 'success');
          this.resetForm();
          this.showProduct();
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
        }
      });
    } else {
 this._productService.postProduct(this.productSelected).subscribe({
        next: (res: any) => {
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
      _id: '',
      title: '',
      description: '',
      price: 0,
      category: '',
      Image: ''
    };
  }
}

