import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PinnedTab } from './models';

@Component({
  selector: 'app-pinnable-tab-bar',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tab-shell" role="tablist" aria-label="Workspace navigation">
      <div #tabList class="tab-list">
        <ng-content />

        <div #tabElement class="pinned-wrap enter" *ngFor="let tab of visibleTabs; trackBy: trackTab">
          <button mat-button class="tab" type="button" role="tab" [attr.aria-selected]="value === tab.value"
                  [class.active]="value === tab.value" (click)="valueChange.emit(tab.value)">
            <mat-icon>{{ tab.icon }}</mat-icon>
            <span>{{ tab.label }}</span>
            <span class="count" *ngIf="tab.count !== undefined">{{ tab.count }}</span>
          </button>
          <button mat-icon-button class="unpin" type="button" [matTooltip]="'Unpin ' + tab.label"
                  (click)="unpinClick($event, tab.value)" [attr.aria-label]="'Unpin ' + tab.label">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <button mat-button *ngIf="overflowTabs.length" class="overflow" type="button" [matMenuTriggerFor]="overflowMenu"
                [attr.aria-label]="overflowTabs.length + ' more pinned items'">
          <mat-icon>more_horiz</mat-icon><span>+{{ overflowTabs.length }}</span>
        </button>
      </div>
      <span class="indicator" [style.left.px]="indicatorLeft" [style.width.px]="indicatorWidth"
            [class.visible]="indicatorWidth > 0"></span>
    </div>

    <mat-menu #overflowMenu="matMenu" class="smart-menu">
      <button mat-menu-item *ngFor="let tab of overflowTabs" (click)="valueChange.emit(tab.value)">
        <mat-icon>{{ tab.icon }}</mat-icon><span>{{ tab.label }}</span><span class="menu-count">{{ tab.count }}</span>
      </button>
    </mat-menu>
  `,
  styleUrl: './pinnable-tab-bar.component.scss'
})
export class PinnableTabBarComponent {
  @Input({ required: true }) pinned: readonly PinnedTab[] = [];
  @Input({ required: true }) value = '';
  @Input() leadingValue = '';
  @Output() readonly valueChange = new EventEmitter<string>();
  @Output() readonly unpin = new EventEmitter<string>();
  @ViewChildren('tabElement', { read: ElementRef }) private tabElements?: QueryList<ElementRef<HTMLElement>>;

  indicatorLeft = 0;
  indicatorWidth = 0;

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

  get maxVisible(): number { return window.innerWidth < 640 ? 1 : 3; }
  get visibleTabs(): readonly PinnedTab[] {
    if (this.pinned.length <= this.maxVisible) return this.pinned;
    const head = this.pinned.slice(0, this.maxVisible);
    const activeOverflow = this.pinned.slice(this.maxVisible).find(tab => tab.value === this.value);
    return activeOverflow ? [...head.slice(0, this.maxVisible - 1), activeOverflow] : head;
  }
  get overflowTabs(): readonly PinnedTab[] {
    const shown = new Set(this.visibleTabs.map(tab => tab.value));
    return this.pinned.filter(tab => !shown.has(tab.value));
  }

  ngAfterViewInit(): void {
    this.tabElements?.changes.subscribe(() => queueMicrotask(() => this.updateIndicator()));
    queueMicrotask(() => this.updateIndicator());
  }
  ngOnChanges(): void { queueMicrotask(() => this.updateIndicator()); }
  @HostListener('window:resize') onResize(): void { this.updateIndicator(); }

  trackTab = (_: number, tab: PinnedTab): string => tab.value;
  unpinClick(event: MouseEvent, value: string): void { event.stopPropagation(); this.unpin.emit(value); }

  private updateIndicator(): void {
    const host = this.hostRef.nativeElement.querySelector<HTMLElement>('.tab-list');
    const active = host?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
    if (!host || !active) { this.indicatorWidth = 0; return; }
    const hostRect = host.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    this.indicatorLeft = rect.left - hostRect.left + host.scrollLeft;
    this.indicatorWidth = rect.width;
  }
}
