import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExternalApiService {
  constructor(private httpClient: HttpClient) {}

  getProvinces(): Observable<any> {
    try {
      return this.httpClient.get('provinces');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  getDistricts(province: number): Observable<any> {
    try {
      return this.httpClient.get('districts', {
        params: {
          province,
        },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
