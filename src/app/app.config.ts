import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';                                    // permite hacer peticiones http
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])) // Nos permite usar interceptores en todas nuestras peticiones
  ]
};
// import { provideHttpClient, withInterceptors } from '@angular/common/http';