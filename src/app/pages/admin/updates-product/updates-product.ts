import { Component, inject } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/products';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-updates-product',
  imports: [FormsModule, RouterLink],
  templateUrl: './updates-product.html',
  styleUrl: './updates-product.css'
})
export class UpdatesProduct {
 private _productService = inject(ProductService);
  allProduct: Product[] = [];
 private route = inject(ActivatedRoute)
 id:any
  productSelected: Product = {
    

    title: '',
    description: '',
    price: 0,
    category: '',
    image: ''
  };

 ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    this.getProduct(this.id)
  }

  
getProduct(id: String){
  this._productService.getProductById(id).subscribe({
     next:(res: any)=> {
     console.log(res)
     this.productSelected = res.data
    },
    error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
        }
  })

}


 
updateProductInfo(){
   this._productService.putProducts(this.productSelected,this.id).subscribe({
    next:(res: any)=> {
     console.log(res)
      Swal.fire('success', 'Producto Actualizado', 'success');
    },
    error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
        }
   })

  }
  
 
}
