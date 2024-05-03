import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cvsUrl } from '../consts/api-routes.consts';
import { CV } from '../models/cv.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(private httpClient: HttpClient) {}

  getCvById(id: number) {
    return this.httpClient.get(`${cvsUrl}/${id}`).pipe(
      map(response => {
        return response as CV;
      }),
    );
  }

  deleteCvById(id: number) {
    this.httpClient.delete(`${cvsUrl}/${id}`);
  }
}
