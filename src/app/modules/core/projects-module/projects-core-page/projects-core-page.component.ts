import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getAllProjects } from '../../../../store/actions/projects.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-projects-core-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects-core-page.component.html',
  styleUrl: './projects-core-page.component.scss',
})
export class ProjectsCorePageComponent {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllProjects());
  }
}
