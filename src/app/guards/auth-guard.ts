// Los Guards  Protegen contenido del frontend
// CanActivate es para proteger rutas completas
// True que si puede mostrar ese contenido
// False 
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../services/login";
import { inject } from "@angular/core";
import { Route } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
    const _loginService = inject(LoginService);
    const _router = inject(Router)

    // 1 Validacion   1. ya inicio  sesion
    if (!_loginService.isLoggedIn()) {
        //Redireccione al inicio de sesion
        alert('Tienes que iniciar sesion')
        _router.navigate(['/login']);
        return false
    }

    // 2. Validacion 2. Es Administrador

    if (!_loginService.isAdmin()) {
        alert('No tienes permitido entrar a este pagina, seras redireccionado al Inicio');
        _router.navigate(['/']);
        return false;
    }
    return true;
};








