import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-base-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslateModule, RouterModule],
  templateUrl: './base-list.component.html',
  styleUrl: './base-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseListComponent {
  @Input() body: any[];
  @Input() headers: string[];
  @Input() routerLinks: string[];

  public keepOriginalOrder = (a: any) => a.key;
}
