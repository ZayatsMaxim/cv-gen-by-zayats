import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnChanges } from '@angular/core';
import { BreadcrumbService } from './breadcrumbs.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent implements DoCheck {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngDoCheck(): void {
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;
  }
}
