import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../shared/models/employee.model';
import * as EmployeeActions from '../actions/employee.actions';
import * as CvActions from '../actions/cv.actions';

export const employeeInitialState: Employee = null;
export const employeesListInitialState: Employee[] = null;

export const employeeReducer = createReducer(
  employeeInitialState,
  on(
    EmployeeActions.getEmployeeByIdSuccess,
    (state, { employee }): Employee => ({
      // ...state,
      ...employee,
    }),
  ),
  on(
    CvActions.createNewCv,
    (state, { cv }): Employee => ({
      ...state,
      cvs: [...state.cvs, cv],
    }),
  ),
  on(CvActions.updateCvSuccess, (state, { cv }): Employee => {
    const newCvs = [...state.cvs];
    newCvs.splice(
      newCvs.findIndex(oldCv => oldCv.id === cv.id),
      1,
      cv,
    );
    return { ...state, cvs: newCvs };
  }),
  on(CvActions.saveNewCvSuccess, (state, { cv }): Employee => {
    const newCvs = [...state.cvs];
    newCvs.splice(
      newCvs.findIndex(oldCv => oldCv.cvName === cv.cvName),
      1,
      cv,
    );
    return { ...state, cvs: newCvs };
  }),
  on(CvActions.deleteCvSuccess, (state, { cv }): Employee => {
    const newCvs = [...state.cvs];
    newCvs.splice(
      newCvs.findIndex(cvToDelete => cvToDelete.id === cv.id),
      1,
    );
    return { ...state, cvs: newCvs };
  }),
  on(CvActions.removeCvFromStoreByName, (state, { cvName }): Employee => {
    const newCvs = [...state.cvs];
    newCvs.splice(
      newCvs.findIndex(cvToDelete => cvToDelete.cvName === cvName),
      1,
    );
    return { ...state, cvs: newCvs };
  }),
);

export const employeesListReducer = createReducer(
  employeesListInitialState,
  on(
    EmployeeActions.getAllEmployeesSuccess,
    (state, { employees }): Employee[] => [...employees],
  ),
);
