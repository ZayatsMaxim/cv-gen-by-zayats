import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-base-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    RouterModule,
    MatPaginatorModule,
  ],
  templateUrl: './base-list.component.html',
  styleUrl: './base-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseListComponent implements OnInit {
  @Input() body: any[];
  @Input() headers: string[];
  @Input() routerLinks: string[];

  page: any[];
  pageSize: number = 5;
  pageIndex = 0;

  pageEvent: PageEvent;

  ngOnInit(): void {
    this.page = this.body.slice(0, this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.page = this.body.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize,
    );
  }

  public keepOriginalOrder = (a: any) => a.key;
}
