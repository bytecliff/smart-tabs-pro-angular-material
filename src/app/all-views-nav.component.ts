import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { VIEWS } from './data';
import { PinnedTab, ViewItem } from './models';
import { PinnableTabBarComponent } from './pinnable-tab-bar.component';

@Component({
  selector: 'app-all-views-nav', standalone: true,
  imports: [NgFor, NgIf, NgTemplateOutlet, MatIconModule, MatButtonModule, MatMenuModule, PinnableTabBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-pinnable-tab-bar [pinned]="pinnedTabs" [value]="active" [leadingValue]="all"
      (valueChange)="active = $event" (unpin)="unpin($event)">
      <button mat-button class="leading-tab" type="button" role="tab" [attr.aria-selected]="active === all"
        [class.active]="active === all" [matMenuTriggerFor]="viewsMenu" #viewTrigger="matMenuTrigger" (click)="active = all">
        <mat-icon>{{ selection?.icon ?? 'layers' }}</mat-icon><span>{{ selection?.label ?? 'All Views' }}</span>
        <span class="count">{{ selection?.count ?? views.length }}</span><mat-icon class="chevron">expand_more</mat-icon>
      </button>
    </app-pinnable-tab-bar>

    <mat-menu #viewsMenu="matMenu" class="smart-menu">
      <div class="views-menu" (click)="$event.stopPropagation()">
        <ng-container *ngIf="pinnedViews.length">
          <div class="caption">Pinned</div>
          <ng-container *ngFor="let view of pinnedViews"><ng-container *ngTemplateOutlet="row; context: {$implicit: view}"></ng-container></ng-container>
          <div class="divider"></div>
        </ng-container>
        <div class="caption">{{ pinnedViews.length ? 'Other Views' : 'All Views' }}</div>
        <ng-container *ngFor="let view of otherViews"><ng-container *ngTemplateOutlet="row; context: {$implicit: view}"></ng-container></ng-container>
      </div>
      <ng-template #row let-view>
        <div class="view-row">
          <button mat-icon-button class="pin" type="button" (click)="togglePin(view.id)" [attr.aria-pressed]="isPinned(view.id)" [attr.aria-label]="(isPinned(view.id) ? 'Unpin ' : 'Pin ') + view.label">
            <mat-icon [class.filled]="isPinned(view.id)">push_pin</mat-icon>
          </button>
          <button mat-button class="row-main" type="button" (click)="selectView(view, viewTrigger)">
            <mat-icon>{{ view.icon }}</mat-icon><span>{{ view.label }}</span><span class="row-count">{{ view.count }}</span>
          </button>
        </div>
      </ng-template>
    </mat-menu>
  `,
  styleUrls: ['./workspace-nav.scss']
})
export class AllViewsNavComponent {
  readonly all = 'all-views'; readonly views = VIEWS;
  active = this.all; pinned: string[] = []; selection: ViewItem | null = null;
  get pinnedViews(): ViewItem[] { return this.views.filter(v => this.isPinned(v.id)).slice().sort(this.byLabel); }
  get otherViews(): ViewItem[] { return this.views.filter(v => !this.isPinned(v.id)).slice().sort(this.byLabel); }
  get pinnedTabs(): PinnedTab[] { return this.pinnedViews.map(v => ({ value: v.id, label: v.label, icon: v.icon, count: v.count })); }
  isPinned(id: string): boolean { return this.pinned.includes(id); }
  togglePin(id: string): void { const removing = this.isPinned(id); this.pinned = removing ? this.pinned.filter(x => x !== id) : [...this.pinned, id]; if (removing && this.active === id) this.active = this.all; }
  unpin(id: string): void { this.pinned = this.pinned.filter(x => x !== id); if (this.active === id) this.active = this.all; }
  selectView(view: ViewItem, trigger: MatMenuTrigger): void { this.selection = view; this.active = this.all; trigger.closeMenu(); }
  private readonly byLabel = (a: ViewItem, b: ViewItem): number => a.label.localeCompare(b.label);
}
