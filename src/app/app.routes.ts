import { Routes } from '@angular/router';
/* importar todos  nuestros componentes pqginas*/
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { Notfound } from './pages/notfound/notfound';
import { Products } from './pages/products/products';
import { Register } from './pages/register/register';
import { Servicios } from './pages/servicios/servicios'; 

export const routes: Routes = [
    
{path:'', component: Home, title:'Inicio'},
{path:'admin', component: Admin, title:'Dashboard'},

{path:'login', component: Login, title:'Inicio Sesion'},

{path:'products', component: Products, title:'Productos'},
{path:'register', component: Register, title:'Registro'},
{path:'servicios', component: Servicios, title:'Servicio'},
{path:'**', component: Notfound, title:'404'},

];
