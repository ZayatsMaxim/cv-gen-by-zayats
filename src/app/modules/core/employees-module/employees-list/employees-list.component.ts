import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-employees-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './employees-list.component.html',
    styleUrl: './employees-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {}
