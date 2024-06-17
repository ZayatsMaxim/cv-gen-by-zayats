import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createNewCv,
  deleteCvById,
  getCvById,
  removeCvFromStoreByName,
  saveNewCv,
  updateCvById,
} from '../actions/cv.actions';
import { CvDTO } from '../../shared/models/dto.model';
import { CV } from '../../shared/models/cv.model';

@Injectable({
  providedIn: 'root',
})
export class CvsFacade {
  constructor(private store: Store) {}

  getCvById(id: number) {
    this.store.dispatch(getCvById({ id: id }));
  }

  updateCvById(id: number, cv: CvDTO) {
    this.store.dispatch(updateCvById({ id: id, cv: cv }));
  }

  createNewCv(cv: CV) {
    this.store.dispatch(createNewCv({ cv: cv }));
  }

  saveNewCv(cv: CvDTO) {
    this.store.dispatch(saveNewCv({ cv: cv }));
  }

  removeCvFromStoreByName(name: string) {
    this.store.dispatch(removeCvFromStoreByName({ cvName: name }));
  }

  deleteCvById(id: number) {
    this.store.dispatch(deleteCvById({ id: id }));
  }
}
