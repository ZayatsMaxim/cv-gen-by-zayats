export interface ProjectDTO {
    projectName: string
    description: string
    startDate: string
    endDate: string
    teamSize: number
    techStack: string[]
    responsibilities: string[]
    teamRoles: string[]
}

export interface LanguageDTO {
    name: {
        name: string
    }
    level: {
        name: string
    }
}

export interface CvDTO {
    cvName: string
    language: LanguageDTO[]
    skills: string[]
    firstName: string
    lastName: string
    email: string
    department: string
    specialization: string
    employeeId: number
    projects: ProjectDTO[]
}

export interface EmployeeDTO {
    firstName: string
    lastName: string
    email: string
    department: string
    specialization: string
}
