import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-list.component.html',
  styleUrl: './base-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseListComponent {
  @Input() body!: Array<{ [key: string]: string }>;
  @Input() headers!: Array<string>;

  public keepOriginalOrder = (a: any) => a.key;
}
