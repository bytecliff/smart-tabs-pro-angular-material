# Smart Tabs Pro — Angular Material

A fresh Angular Material implementation of the Smart Tabs Pro interaction model.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Preserved business rules

- Selecting a report or view changes the primary dropdown label and count; it does not create a pinned tab.
- Clicking a pin adds or removes a quick-access tab without changing the primary dropdown selection.
- Pinned tabs appear immediately to the right of the primary dropdown.
- Up to three pinned tabs appear on desktop and one on mobile; remaining items use the overflow menu.
- The active pinned item stays visible when the tab list overflows.
- Unpinning the active tab returns the active state to the primary dropdown.
- Report navigation uses a category/report master-detail menu.
- View navigation keeps pinned and unpinned groups alphabetically sorted.

The application uses standalone components, strict TypeScript, OnPush change detection, Angular Material buttons, icon buttons, menus and tooltips, plus the official Material Symbols Rounded icon font and responsive SCSS.
