import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const _loginService = inject(LoginService);

  const token = _loginService.getToken();
  console.log(token)
  const request = token ? req.clone({ setHeaders: { Authorization: "Bearer " + token } }) : req;
  console.log(request)
  return next(request);
};
