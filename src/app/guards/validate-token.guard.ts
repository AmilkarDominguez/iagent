import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';
import { IagentService } from '../iagent/services/iagent.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
    private router: Router) { }


  canActivate(): Observable<boolean> | boolean {
    if (this.authService.checkLocalStorage()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }

    //Validation withService
    // if (user) {
    //   return this.authService.validateToken()
    //     .pipe(
    //       tap(valid => {
    //         console.log('arrived canActivate');

    //         if (!valid) {
    //           this.router.navigateByUrl('/auth');
    //         }
    //       })
    //     );
    // }
    // return true;
  }

  canLoad(): Observable<boolean> | boolean {
    //this.authService.checkUser().subscribe(console.log)
    if (this.authService.checkLocalStorage()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
    //Validation withService
    //if (user) {
    // if (user) {
    //   return this.authService.validateToken()
    //     .pipe(
    //       tap(valid => {
    //         console.log('arrived canLoad');

    //         if (!valid) {
    //           this.router.navigateByUrl('/auth');
    //         }
    //       })
    //     );
    // }
    // return true;
  }
}