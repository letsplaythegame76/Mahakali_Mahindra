# ShowroomDesk CRM

This is the original ShowroomDesk GitHub Pages application with its source responsibilities split into externally managed modules. The application behavior, DOM IDs, inline event handlers, Firebase collections, Razorpay flow, and `window.app` global are preserved for compatibility.

## Runtime architecture

```text
index.html
  -> src/styles/app.css
  -> src/config/firebase.js
  -> src/app/bootstrap.js
       -> src/app/ShowroomDeskCRM.js
```

- `index.html` owns the screens, forms, tables, modals, and compatibility markup.
- `src/styles/app.css` owns the complete stylesheet extracted from the original document.
- `src/config/firebase.js` owns Firebase initialization, offline persistence, and the `window.firebase` adapter used by the CRM.
- `src/app/ShowroomDeskCRM.js` owns the existing CRM workflows: authentication, registration, enquiries, inventory, team management, interventions, reports, pamphlets, WhatsApp, payments, subscription state, and trial restrictions.
- `src/app/bootstrap.js` is the single runtime entrypoint and imports the CRM class while preserving `window.app`.
- `tools/split-monolith.ps1` is a one-time maintenance utility used to repeat the extraction from a fresh copy of the original HTML.

## GitHub Pages deployment

This remains a static site. Commit `index.html` and the `src/` directory together. GitHub Pages loads the relative module paths directly; no bundler or server-side runtime is required.

Do not rename the existing DOM IDs or remove the `window.app` / `window.firebase` contracts. The original inline handlers depend on them.