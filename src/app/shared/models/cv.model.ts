import { Project } from './project.model';
import { Shared } from './shared.model';

export interface CV {
  id: number;
  cvName: string;
  language: Language[];
  skills: Shared[];
  firstName: string;
  lastName: string;
  email: string;
  department: Shared;
  departmentId: number;
  specialization: Shared;
  specializationId: number;
  employeeId: number;
  cvsProjects: Project[];
}

export interface Language {
  id: number;
  nameId: number;
  levelId: number;
}
