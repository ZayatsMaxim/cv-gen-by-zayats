import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ProjectFormComponent } from '../../../../shared/forms/project-form/project-form.component'

@Component({
    selector: 'app-project-info',
    standalone: true,
    imports: [CommonModule, ProjectFormComponent],
    templateUrl: './project-info.component.html',
    styleUrl: './project-info.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoComponent {}
