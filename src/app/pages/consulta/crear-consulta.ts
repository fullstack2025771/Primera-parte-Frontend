import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Consulta } from '../../services/consulta';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-consulta',
  imports: [ RouterModule, FormsModule],
  templateUrl: './crear-consulta.html',
  styleUrl: './crear-consulta.css',
})
export class CrearConsulta {
 constructor(private _consultaService: Consulta){}
  private _CrearConsulta = inject(CrearConsulta);

Consulta = {
   nombre: '',
    mascota: '',
    telefono: '',
    problema: ''
};
 enviarConsulta() {
    this._consultaService.crearConsulta(this.Consulta).subscribe({
      next: (res: any) => {
        Swal.fire(' Consulta registrada', res.mensaje || 'La consulta fue creada con éxito', 'success');
        this.Consulta = { nombre: '', mascota: '', telefono: '', problema: '' };
      },
      error: (err: any) => {
        Swal.fire(' Error', err.error?.mensaje || 'No se pudo registrar la cita', 'error');
      }
    });
  }

}