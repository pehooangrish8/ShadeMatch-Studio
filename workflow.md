# Development Workflow

This document outlines a simple workflow for working on ShadeMatch Studio efficiently.

## 1. Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

## 2. Working Style

- Keep UI changes inside the relevant page or component under src/
- Prefer reusable components when a pattern appears more than once
- Keep state updates centralized in the app context when shared across pages
- Use mock data in src/data/ for rapid prototyping

## 3. Common Change Areas

### Adding a new page

1. Create the page component in src/pages/
2. Import and add it to the route configuration in src/App.tsx
3. Add a navigation link in the navbar or footer if needed

### Updating shared state

- Use src/context/AppContext.tsx for cart, profile, appointments, wishlist, and saved looks
- Keep the context shape consistent with the types defined in src/types.ts

### Styling updates

- Use Tailwind utility classes for layout and visual design
- Keep the existing color palette and luxury theme consistent

## 4. Validation Checklist

Before finishing a change:

```bash
npm run lint
npm run build
```

If something breaks:

- review the TypeScript error output
- confirm imports and route wiring
- verify any new component props or state changes

## 5. Suggested Development Cycle

1. Create or update a feature branch
2. Make the UI or logic change
3. Test in the browser
4. Run lint and build
5. Commit with a clear message
6. Open a pull request with a summary of the change

## 6. Recommended Branch Naming

- feature/short-description
- fix/bug-name
- chore/maintenance-task

## 7. Helpful Notes

- The app uses localStorage for demo persistence, so refreshes will retain profile and cart state
- Vite serves on port 3000 by default
- The project is front-end focused, so most changes will be in the React UI layer
