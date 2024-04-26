import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BasicInputDirective } from '../basic-input.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjectFormComponent } from '../../forms/project-form/project-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cv-projects-list',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    ProjectFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './cv-projects-list.component.html',
  styleUrl: './cv-projects-list.component.scss',
})
export class CvProjectsListComponent extends BasicInputDirective {}
