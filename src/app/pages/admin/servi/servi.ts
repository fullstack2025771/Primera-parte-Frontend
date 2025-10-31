import { Component, inject, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { ServiciosService } from '../../../services/servicios';
import { Servicios } from '../../../interfaces/servicios';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-servi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servi.html',
  styleUrls: ['./servi.css'],
})
export class Servi implements OnInit {
  //estos son los servicios del backend
  servicios: Servicios[] = [];
  // inyecto el servicio
  // Servicio selecccionado para actualizar
  servicioSeleccionado: any;
  private _serviciosService = inject(ServiciosService);
  ngOnInit(): void {
    this.obtenerServicios();
  }

  baseUrl: string = environment.appUrl
  obtenerServicios(): void {
    this._serviciosService.getServicios().subscribe({
      next: (data: any) => {
        this.servicios = data.data;
        console.log('Servicios subidos', this.servicios);
      },
      error: (err: any) => {
        console.error('error al obtener los servicios:', err);
      },
    });
  }
nuevoServicioForm(){
  this._serviciosService.postServicios(this.servicioSeleccionado).subscribe({
    next: (data: any)=> {
      this.servicios =data.data;
      console.log('Servicios subidos', this.servicios)
    
    },
    error: (err: any) => {
      console.error('Error al crear los servicios');
    }
  })
}






  updateServiInfo(id: string): void {
    console.log('Id del Servicio a Actualizar:', id);
    const servicio = this.servicios.find(s => s._id === id)
    if (servicio) {
      this.servicioSeleccionado = { ...servicio };
    }
  }
    // cuando se preciona el boton Actualizar
 actualizarServicio(): void {
   if(!this.servicioSeleccionado?._id) return;

    this._serviciosService.putServicios(

       this.servicioSeleccionado , this.servicioSeleccionado._id).subscribe({
    next: (res: any) => {
      Swal.fire('Actualizado', res.mensaje || 'Servicio actualizado con exito', 'success');
        this.servicioSeleccionado = null;
        this.obtenerServicios();
      },
      error: (err: any) => {
        console.error('Error al actualizar el servicio', err);
        Swal.fire('Error', err.error?.mensaje || 'No se pudo actualizar el Servicio', 'error');
      },
    });
   }
 //cuando se presiona el botón Actualizar}



    deleteServicio(id: string): void {
      Swal.fire({
        title: 'Admin, Estas seguro que quieres Eliminar',
        text: ' Este servicio se eliminara por siempre',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si; Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this._serviciosService.deleteServicios(id).subscribe({
            next: (res: any) => {
              Swal.fire('Eliminado', res.mensaje || 'Servicio eliminado con Exito', 'success');
              this.obtenerServicios();
            },
            error: (err: any) => {
              console.error('Error al eliminar el servicio:', err);
              Swal.fire('Error', err.error?.mensaje || 'No se pudo eliminar el servicio', 'error');
            },
          });
        }
      });
    }
  }
    


  




