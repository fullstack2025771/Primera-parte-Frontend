import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';
// import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
   imports: [RouterLink,],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
   private _loginService = inject(LoginService);
 isVisible : boolean= this._loginService.isAdmin();
  
}
