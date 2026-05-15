# Money Track

A Vite + React + TypeScript personal finance tracker app.

## Project Setup

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build the app for production
- `npm run preview` - locally preview the production build
- `npm run lint` - run ESLint across the project

## Project Structure

- `src/` - React components, context, and utilities
- `src/components/` - app UI components
- `src/context/FinanceContext.tsx` - shared finance state
- `src/utils/` - helper modules such as categories and storage

## GitHub Setup

1. Create a new repository on GitHub.
2. In this project folder, run:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## Notes

- `.gitignore` already excludes `node_modules`, build output, logs, and editor files.
- Update `package.json` fields like `name` and `version` before publishing if needed.
