import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { REPORT_CATEGORIES } from './data';
import { ReportCategory, ReportItem, PinnedTab } from './models';
import { PinnableTabBarComponent } from './pinnable-tab-bar.component';

@Component({
  selector: 'app-all-reports-nav', standalone: true,
  imports: [NgFor, MatIconModule, MatButtonModule, MatMenuModule, PinnableTabBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-pinnable-tab-bar [pinned]="pinnedTabs" [value]="active" [leadingValue]="all"
      (valueChange)="active = $event" (unpin)="unpin($event)">
      <button mat-button class="leading-tab" type="button" role="tab" [attr.aria-selected]="active === all"
        [class.active]="active === all" [matMenuTriggerFor]="reportsMenu" (click)="active = all">
        <mat-icon>grid_view</mat-icon><span>{{ selection?.label ?? 'All Reports' }}</span>
        <span class="count">{{ selection?.count ?? totalReports }}</span><mat-icon class="chevron">expand_more</mat-icon>
      </button>
    </app-pinnable-tab-bar>

    <mat-menu #reportsMenu="matMenu" class="smart-menu">
      <div class="reports-menu" (click)="$event.stopPropagation()">
        <div class="categories">
          <div class="caption">Categories</div>
          <div class="category-row" *ngFor="let category of categories" [class.focused]="category.id === detail.id"
               (mouseenter)="detail = category">
            <button mat-icon-button class="pin" type="button" (click)="togglePin(category.id)" [attr.aria-pressed]="isPinned(category.id)" [attr.aria-label]="(isPinned(category.id) ? 'Unpin ' : 'Pin ') + category.label">
              <mat-icon [class.filled]="isPinned(category.id)">push_pin</mat-icon>
            </button>
            <button mat-button class="row-main" type="button" (click)="detail = category">
              <mat-icon>{{ category.icon }}</mat-icon><span>{{ category.label }}</span>
            </button>
          </div>
        </div>
        <div class="reports">
          <div class="caption">{{ detail.label }}</div>
          <button mat-menu-item *ngFor="let report of detail.reports" (click)="selectReport(report)">
            <span>{{ report.label }}</span><span class="row-count">{{ report.count }}</span>
          </button>
        </div>
      </div>
    </mat-menu>
  `,
  styleUrls: ['./workspace-nav.scss']
})
export class AllReportsNavComponent {
  readonly all = 'all-reports'; readonly categories = REPORT_CATEGORIES;
  readonly totalReports = REPORT_CATEGORIES.reduce((sum, category) => sum + category.reports.length, 0);
  active = this.all; pinned: string[] = []; detail = REPORT_CATEGORIES[0]; selection: ReportItem | null = null;

  get pinnedTabs(): PinnedTab[] { return this.pinned.map(id => this.categories.find(c => c.id === id)!).filter(Boolean).map(c => ({ value: c.id, label: c.label, icon: c.icon, count: c.reports.length })); }
  isPinned(id: string): boolean { return this.pinned.includes(id); }
  togglePin(id: string): void { this.pinned = this.isPinned(id) ? this.pinned.filter(item => item !== id) : [...this.pinned, id]; }
  unpin(id: string): void { this.pinned = this.pinned.filter(item => item !== id); if (this.active === id) this.active = this.all; }
  selectReport(report: ReportItem): void { this.selection = report; this.active = this.all; }
}
