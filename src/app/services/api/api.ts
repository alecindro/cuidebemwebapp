import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import { createRequestOption } from './request-utils';

@Injectable({providedIn: 'root'})
export class Api {
    public static API_URL = SERVER_API_URL;

    constructor(private http: HttpClient) {
    }

    get(endpoint: string, req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get(Api.API_URL + '/' + endpoint, {params: options, observe: 'response', withCredentials: true});
    }

    post(endpoint: string, body: any): Observable<HttpResponse<any>> {
        return this.http.post(Api.API_URL + '/' + endpoint, body, {observe: 'response', withCredentials: true});
    }

    put(endpoint: string, body: any): Observable<HttpResponse<any>> {
        return this.http.put(Api.API_URL + '/' + endpoint, body, {observe: 'response', withCredentials: true});
    }

    delete(endpoint: string): Observable<HttpResponse<any>> {
        return this.http.delete(Api.API_URL + '/' + endpoint, {observe: 'response', withCredentials: true});
    }

    patch(endpoint: string, body: any): Observable<HttpResponse<any>> {
        return this.http.put(Api.API_URL + '/' + endpoint, body, {observe: 'response', withCredentials: true});
    }
}
