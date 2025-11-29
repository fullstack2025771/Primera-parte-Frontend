import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Citas } from '../../services/citas';



@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class ServiciosComponent {
  // private _citasService = inject(CitasServicios);
  constructor(private _citasService: Citas){}
 consulta = {
    nombre: '',
    mascota: '',
    telefono: '',
    descripcion: ''
  };

  crearConsulta() {
    this._citasService.crearCita(this.consulta).subscribe({
      next: (res: any) => {
        Swal.fire('✅ Consulta enviada', res.mensaje || 'Se ha enviado tu consulta médica', 'success');
        this.consulta = { nombre: '', mascota: '', telefono: '', descripcion: '' };
      },
      error: (err: any) => {
        Swal.fire('❌ Error', err.error?.mensaje || 'No se pudo enviar la consulta', 'error');
      }
    });
  }
}

  