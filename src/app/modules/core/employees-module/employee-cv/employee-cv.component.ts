import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-employee-cv',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './employee-cv.component.html',
    styleUrl: './employee-cv.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCvComponent {}
