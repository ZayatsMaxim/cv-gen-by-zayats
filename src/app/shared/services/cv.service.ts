import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cvsUrl } from '../consts/api-routes.consts';
import { CV } from '../models/cv.model';
import { catchError, map } from 'rxjs';
import { CvDTO } from '../models/dto.model';

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

  updateCvById(id: number, cv: CvDTO) {
    return this.httpClient.put(`${cvsUrl}/${id}`, cv).pipe(
      map(response => {
        return response as CV;
      }),
    );
  }

  deleteCvById(id: number) {
    return this.httpClient.delete(`${cvsUrl}/${id}`).pipe(
      map(response => {
        return response as CV;
      }),
    );
  }

  createCv(cv: CvDTO) {
    return this.httpClient.post(`${cvsUrl}`, cv).pipe(
      map(response => {
        return response as CV;
      }),
    );
  }
}
