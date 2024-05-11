import { CV } from './cv.model';
import { Shared } from './shared.model';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: Shared;
  departmentId: number;
  specialization: Shared;
  specializationId: number;
  cvs: CV[];
}
