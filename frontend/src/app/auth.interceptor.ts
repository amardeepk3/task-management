import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // return next(req);
const authService = inject(AuthService);
   // Check if the user is logged in
   const token = authService.getToken();
   if (token) {
     // Clone the request and add the Authorization header with the token
     const clonedRequest = req.clone({
       setHeaders: {
         Authorization: `Bearer ${token}`
       }
     });
     return next(clonedRequest);
   }
   return next(req);
};
