import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


import { AuthResponse, User } from '../interfaces/interfaces';
import { Feature } from 'src/app/iagent/interfaces/feature.interface';
import { IagentService } from 'src/app/iagent/services/iagent.service';
import { AppHttpClient } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  public _user!: User;

  get User() {
    return { ...this._user };
  }

  httpClient: HttpClient;

  constructor(
    private http: HttpClient,
    private iagentService: IagentService,

  ) {
    this.httpClient = AppHttpClient;
  }
  checkUser11(): Observable<boolean> {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('refresh_token') || ''),
      withCredentials: true
    };

    return this.httpClient.post<AuthResponse>(`${this.baseUrl}/auth/refresh`, {}, httpOptions)
      .pipe(
        map(valido => {
          return true;
        }),
        catchError(error => {
          return of(false);
          //return of(error.error.message)
        })
      );

  }

  checkUser3(): Observable<boolean> {

    console.log('entrando a checkUser')
    let access_token = localStorage.getItem('access_token');

    let refresh_token = localStorage.getItem('refresh_token');
    console.log('refresh_token');
    console.log(refresh_token);

    let headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + refresh_token || '')
      .append('x-token', 'Bearer ' + refresh_token || '');

    console.log('headers a authService')
    console.log(headers);




    console.log(headers.delete('Authorization'));
    console.log(headers);

    return this.httpClient.post<AuthResponse>(`${this.baseUrl}/auth/refresh`, { headers })
      .pipe(
        map(valido => {
          console.log('entrando 123.....')
          console.log(valido);
          return of(true);
        }),
        catchError(error => {
          console.log('error checkUser');
          console.log('error checkUser');
          console.log(error.error);
          console.log(error.error.message);
          return of(false);
          return of(error.error.message)
        })
      );

  }
  checkLocalStorage(): boolean {


    let access_token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');
    let email = localStorage.getItem('email');

    if (access_token && refresh_token && email) {
      //console.log("checkUser return true")
      return true;
    } else {
      //console.log("checkUser return false")
      return false;
    }

    return false;
  }

  register(name: string, lastname: string, phone_number: string, email: string, password: string, rol: string) {

    const url = `${this.baseUrl}/auth/local/signup`;
    const body = { email, password, name, lastname, phone_number, rol };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          console.log('tap')
          localStorage.setItem('access_token', resp.access_token!);
          localStorage.setItem('refresh_token', resp.refresh_token!);
          localStorage.setItem('email', email);
          return true
        }),
        map(resp => {
          console.log('map')
          return true
        }),
        catchError(error => {
          console.log('catchError')
          console.log(error)
          console.log(error.error.error)
          console.log(error.error.message)
          console.log(error.error.statusCode)
          return of(error.error.message)
        })
      );

  }



  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth/local/signin/`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          //console.log('tap')
          localStorage.setItem('access_token', resp.access_token!);
          localStorage.setItem('refresh_token', resp.refresh_token!);
          localStorage.setItem('email', email);
          return true
        }),
        map(resp => {
          //console.log('map')
          return true
        }),
        catchError(error => {
          console.log('catchError')
          console.log(error)
          console.log(error.error.error)
          console.log(error.error.message)
          console.log(error.error.statusCode)
          return of(error.error.message)
        })
      );
  }


  validateToken(): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token') || '');
    return this.http.get<Feature[]>(`${this.baseUrl}/properties/all/features`, { headers })
      .pipe(
        map(valido => {
          console.log('map')
          //console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error 123123');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }


  validateToken2(): Observable<boolean> {


    const url = `${this.baseUrl}/auth/refresh`;

    const token = localStorage.getItem('refresh_token');
    console.table('token...');
    console.table(token);

    // const headers = new HttpHeaders()
    //   .set('Authorization', 'Bearer ' + tok!)
    // .set('Authorization', localStorage.getItem('refresh_token') || '')
    //.set('x-token', 'Bearer ' + localStorage.getItem('refresh_token') || '');

    // const headers = new HttpHeaders()
    //   .set('x-token', localStorage.getItem('refresh_token') || '');

    // const headers = new HttpHeaders()
    //   .set('Authorization', 'Bearer ' + localStorage.getItem('refresh_token') || '');

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token || '');

    console.log(headers);




    return this.http.post<AuthResponse>(url, { headers })
      //return this.http.post<any>(url, {}, { withCredentials: true })
      //return this.http.post<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {


          console.log('respuesta refresh_token server OK')
          console.log(resp);
          localStorage.setItem('access_token', resp.access_token!);
          localStorage.setItem('refresh_token', resp.refresh_token!);
          // this._user = {
          //   name: resp.name!,
          //   uid: resp.uid!,
          //   email: resp.email!
          // }
          return of(true);
        }),
        //catchError(err => of(false))
        catchError(err => {
          console.log('hay error')
          console.log(err)
          // console.log(err)
          // console.log(err.error)
          // console.log(err.message)
          console.log(err.error.statusCode)
          console.log(err.error.message)
          //return err
          return of(err.error.message)
        })

      );

  }

  logout() {
    localStorage.clear();
  }

  getEmail() {
    return localStorage.getItem('email');
  }

}
