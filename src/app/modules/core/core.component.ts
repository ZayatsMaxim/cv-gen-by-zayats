import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-core',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './core.component.html',
    styleUrl: './core.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {}
