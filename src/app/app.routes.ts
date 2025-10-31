import { Routes } from '@angular/router';
/* importar todos  nuestros componentes pqginas*/
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { Notfound } from './pages/notfound/notfound';
import { Products } from './pages/products/products';
import { Register } from './pages/register/register';
import { Servicios } from './pages/servicios/servicios';

import { authGuard } from './guards/auth-guard';
import { UserComponent } from './pages/admin/users/users';
import { Inventory } from './pages/admin/inventory/inventory';
import { Servi } from './pages/admin/servi/servi';
import { Dashboard } from './pages/admin/dashboard/dashboard';


export const routes: Routes = [

    { path: '', component: Home, title: 'Inicio' },

    {
        path: 'dashboard',
        component: Admin,
        title: 'Dashboard',
        canActivate: [authGuard],
        canActivateChild: [authGuard],// proteger rutas hijas
        children: [
            { path: '', component: Dashboard },
            { path: 'inventory', component: Inventory },
            { path: 'services', component: Servi },
            { path: 'user', component: UserComponent }
        ]
    },


    { path: 'login', component: Login, title: 'Inicio Sesion' },

    { path: 'products', component: Products, title: 'Productos' },
    { path: 'register', component: Register, title: 'Registro' },
    { path: 'servicios', component: Servicios, title: 'Servicio' },
    { path: '**', component: Notfound, title: '404' },

];
