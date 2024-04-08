import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-project-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project-info.component.html',
    styleUrl: './project-info.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoComponent {}
