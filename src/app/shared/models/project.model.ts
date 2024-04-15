import { Shared } from './shared.model'

export interface Project {
    id: number
    projectName: string
    description: string
    startDate: string
    endDate: string
    teamSize: number
    techStack: Shared[]
    responsibilities: Shared[]
    teamRoles: Shared[]
}
