import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseListComponent } from '../../../../shared/base-list/base-list.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, BaseListComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {}
