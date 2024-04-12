import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-base-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './base-list.component.html',
    styleUrl: './base-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseListComponent {
    options!: Array<{ [key: string]: string }>
    header: Array<string> = ['header1', 'header2']
}
