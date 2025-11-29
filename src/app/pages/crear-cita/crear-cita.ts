import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Citas } from '../../services/citas';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-cita',
  imports: [ RouterModule, FormsModule],
  templateUrl: './crear-cita.html',
  styleUrl: './crear-cita.css'
})
export class CrearCita {
constructor(private _citasService: Citas){}


  cita = {
    nombreDueno: '',
    nombreMascota: '',
    telefono: '',
    describeProblema: '',
    date: '', 
  };

  enviarCita() {
    console.log(this.cita)
    this._citasService.crearCita(this.cita).subscribe({
      next: (res: any) => {
        Swal.fire(' Cita registrada', res.mensaje || 'La cita fue creada con éxito', 'success');
        
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire(' Error', err.error?.mensaje || 'No se pudo registrar la cita', 'error');
      }
    });
  }
}
