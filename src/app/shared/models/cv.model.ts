import { Language } from './employee.model'
import { Project } from './project.model'
import { Shared } from './shared.model'

export interface CV {
    id: number
    cvName: string
    language: Language[]
    skills: Shared[]
    firstName: string
    lastName: string
    email: number
    department: Shared[]
    departmentId: number
    specialization: Shared[]
    specializationId: number
    employeeId: number
    cvsProjects: Project[]
}
