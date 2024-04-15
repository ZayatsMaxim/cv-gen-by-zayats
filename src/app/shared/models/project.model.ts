export interface Project {
    id: number
    projectName: string
    description: string
    startDate: string
    endDate: string
    teamSize: number
    techStack: TechStack[]
    responsibilities: Responsibility[]
    teamRoles: TeamRole[]
}

export interface TechStack {
    id: number
    name: string
}

export interface Responsibility {
    id: number
    name: string
}

export interface TeamRole {
    id: number
    name: string
}
