import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-employee-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './employee-info.component.html',
    styleUrl: './employee-info.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoComponent {}
