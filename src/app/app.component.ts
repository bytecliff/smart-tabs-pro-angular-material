import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AllReportsNavComponent } from './all-reports-nav.component';
import { AllViewsNavComponent } from './all-views-nav.component';

@Component({
  selector: 'app-root', standalone: true,
  imports: [AllReportsNavComponent, AllViewsNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <h1>Workspace navigation variations</h1>
      <p class="intro">The dropdown is the complete library; pinned tabs are the user's quick-access workspace.</p>
      <section>
        <h2>Variation 1 — All Reports (categories)</h2>
        <p>Master-detail dropdown: hover a category to preview its reports, or use the pin to add it as a tab.</p>
        <app-all-reports-nav />
      </section>
      <section>
        <h2>Variation 2 — All Views (pinned first)</h2>
        <p>Single list with pinned views sorted first and remaining views below—both alphabetical.</p>
        <app-all-views-nav />
      </section>
    </main>
  `,
  styles: [`
    main { width: min(1024px, 100%); margin: 0 auto; padding: 48px 24px; }
    h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -.02em; }
    .intro, section p { color: var(--st-muted); font-size: 14px; }
    .intro { max-width: 680px; margin: 8px 0 0; }
    section { margin-top: 56px; }
    h2 { margin: 0 0 4px; color: var(--st-muted); font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
    section p { margin: 0 0 16px; }
  `]
})
export class AppComponent {}
