import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


import { User } from '../interfaces/user.interface';
import { Feature } from '../interfaces/feature.interface';
import { PropertyCreateResponse, Properties, Property } from '../interfaces/property.interface';
import { Log, Logs } from '../interfaces/log.interface';
import { Response } from '../interfaces/response.inteface';
import { AuthResponse } from 'src/app/auth/interfaces/interfaces';
import { Department } from '../interfaces/department.interface';

@Injectable({
  providedIn: 'root'
})
export class IagentService {

  private baseUrl: string = environment.baseUrl;

  response!: Response;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    const headers = this.getToken();
    return this.http.get<User>(`${this.baseUrl}/user`, { headers })
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/location/departments`)
      .pipe(
        map(valido => {
          //console.log('map')
          //console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }
  getFeatures(): Observable<Feature[]> {
    const headers = this.getToken();
    return this.http.get<Feature[]>(`${this.baseUrl}/property/features`, { headers })
      .pipe(
        map(valido => {
          //console.log('map')
          //console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }


  getPropertiesByMatch(id: number): Observable<Property[]> {
    //const headers = this.getToken();
    const body = {
      propertyId: id
    }
    //console.log(body);

    return this.http.post<Property[]>(`${this.baseUrl}/property/matchs/`, body)
      .pipe(
        map(valido => {
          //console.log('map')
          console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }
  getProperties(prot?: any[], offt?: any[], dptId?: any[]): Observable<Properties> {



    return this.http.get<Properties>(`${this.baseUrl}/property`, { params: { prot: prot!, offt: offt!, dptId: dptId! } })
      .pipe(
        map(valido => {
          console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }
  getPropertiesOfUser(): Observable<Properties> {
    // const headers = this.getToken();
    // console.log('headers getPropertiesOfUser');
    // console.log(headers);
    //return this.http.get<Properties>(`${this.baseUrl}/property`, { headers })
    return this.http.get<Properties>(`${this.baseUrl}/property/user`)
      .pipe(
        map(valido => {
          //console.log(valido.items);
          //console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }

  getPropertyById(id: number): Observable<Property> {
    //const headers = this.getToken();

    return this.http.get<Property>(`${this.baseUrl}/property/${id}`)
      .pipe(
        map(valido => {
          // console.log('map')
          //console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }
  getLogs(id: number): Observable<Logs> {
    //const headers = this.getToken();
    //console.log('arrived get log');

    return this.http.get<Logs>(`${this.baseUrl}/property/${id}/logs`)
      .pipe(
        map(valido => {
          console.log('map')
          console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }
  registerLog(propertyId: number, action: string, detail: string): Observable<Log> {

    const body = {
      propertyId,
      action,
      detail
    }

    console.log(body);

    return this.http.post<Log>(`${this.baseUrl}/property/log`, body)
      .pipe(
        map(valido => {
          // console.log('map')
          console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }
  updateStatusProperty(propertyId: number, status: string) {

    const body = {
      propertyId,
      status
    }

    console.log(body);

    return this.http.patch(`${this.baseUrl}/property/${propertyId}/update`, body)
      .pipe(
        map(valido => {
          // console.log('map')
          console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }


  registerProperty(
    title: string,
    description: string,
    price: number,
    total_surface: number,
    constructed_surface: number,
    length_unit: string,
    lat: number,
    lon: number,
    offer_type: string,
    currency_type: string,
    property_type: string,
    no_bathrooms: number,
    no_bedrooms: number,
    address: string,
    property_location: string,
    countryId: number,
    departmentId: number,
    features: any[],
    files: any[],
    publication_type: string,
  ) {

    // const headers = this.getToken();
    // console.log('token...')
    // console.log(localStorage.getItem('access_token'))

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('total_surface', total_surface.toString());
    formData.append('constructed_surface', constructed_surface.toString());
    formData.append('length_unit', length_unit);
    formData.append('lat', lat.toString());
    formData.append('lon', lon.toString());
    formData.append('offer_type', offer_type);
    formData.append('currency_type', currency_type);
    formData.append('property_type', property_type);
    formData.append('no_bathrooms', no_bathrooms.toString());
    formData.append('no_bedrooms', no_bedrooms.toString());
    formData.append('address', address);
    formData.append('property_location', property_location);
    formData.append('countryId', countryId.toString());
    formData.append('departmentId', departmentId.toString());
    formData.append('publication_type', publication_type);

    // ***Metodos para feature

    if (features.length > 0) {
      formData.append('features', JSON.stringify(features));
    }

    console.log("formData.get('features') : ", formData.get('features'));
    // ***End metodos para feature



    // ***Metodos para files
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    console.log(formData.get('files'));
    //console.log('body.files : ', body.files);
    // *** end Metodos para files

    return this.http.post<PropertyCreateResponse>(`${this.baseUrl}/property`, formData)
      .pipe(
        map(valido => {
          // console.log('map')
          // console.log(valido);
          return valido;

        }),
        catchError(error => {
          console.log('error');
          console.log(error.error.message);
          //of(false)
          return of(error.error.message)

        })
      );
  }

  getToken(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token') || '');
    return headers
  }


  getUIAvatar(name: string) {
    const headers = new HttpHeaders()
      .set('Authorization', '');
    const body = {
      name,
      background: "FF666C",
      color: "FFFFFF"
    }
    return this.http.post<ImageBitmap>('https://ui-avatars.com/api/', body, { headers })
      .pipe(
        map(valido => {
          console.log('map')
          console.log(valido);
          return valido;
        }),
        catchError(error => {
          console.log('error');
          console.log(error);
          //console.log(error.error.message);
          //of(false)
          return of(error.error.message)
        })
      );
  }

}
