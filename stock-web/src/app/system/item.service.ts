import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './models/item.model';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ItemService {

    // private URL: string = 'http://localhost:8080/api/';
    private URL: string = 'http://132.148.167.63:81/api/';
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {}

    list(): Observable<any> {
        return this.http.get<Item[]>(this.URL + 'items');
    }

    item(param: string): Observable<any> {
        return this.http.get<Item>(this.URL + 'item/' + param.trim()).pipe(
  
            catchError( e => {
                if (e.status === 500) {
                    return throwError(e);
                }
                Swal.fire({
                    icon: 'error',
                    title: e.error.msn
                  });
                console.error('ERROR: ' + e.error.error);
                return throwError(e);
            })
        );
    }

    update(param: Item): Observable<any> {
        return this.http.put<any>(this.URL + 'item/' + param.id, param, { headers: this.httpHeaders }).pipe(
  
            catchError( e => {
                if (e.status === 500) {
                    return throwError(e);
                }
                Swal.fire({
                    icon: 'error',
                    title: e.error.msn
                  });
                console.error('ERROR: ' + e.error.error);
                return throwError(e);
            })
        );
    }

    create(param: Item): Observable<any> {
        console.log(param);
        return this.http.post<Item>(this.URL + 'item', param, { headers: this.httpHeaders }).pipe(

            catchError( e => {
                if (e.status === 500) {
                    return throwError(e);
                }
                Swal.fire({
                    icon: 'error',
                    title: e.error.msn
                  });
                console.error('ERROR: ' + e.error.error);
                return throwError(e);
            })
        );
    }

    delete(param: string): Observable<any> {
        console.log(param);
        return this.http.delete<Item>(this.URL + 'item/' + param, { headers: this.httpHeaders }).pipe(

            catchError( e => {
                if (e.status === 500) {
                    return throwError(e);
                }
                Swal.fire({
                    icon: 'error',
                    title: e.error.msn
                  });
                console.error('ERROR: ' + e.error.error);
                return throwError(e);
            })
        );
    }
}
