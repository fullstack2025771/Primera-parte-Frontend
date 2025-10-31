import { Component,inject } from '@angular/core';
import { Router, RouterModule,RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login';




@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,RouterLink, RouterLinkActive, RouterModule ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  private _loginService = inject(LoginService);

  logout(){
    this._loginService.logout();
  }
}
