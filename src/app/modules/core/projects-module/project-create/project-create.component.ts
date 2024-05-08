import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateComponent {}
