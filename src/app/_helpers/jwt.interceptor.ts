import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.checkLocalStorage()) {
            /**Option 1 */
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
            });
            /**Option 2 */
            // request = request.clone({
            //     headers: new HttpHeaders({
            //         'Content-Type': 'application/json',
            //         'Auth-Token': `Bearer ${localStorage.getItem('access_token')}`,
            //         'x-token': `Bearer ${localStorage.getItem('refresh_token')}`
            //     })
            // });
            /**Option 3 */
            // request = request.clone({
            //     headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`),
            // });
        }



        //console.log('Intercepted HTTP call', request);
        return next.handle(request);
    }
}